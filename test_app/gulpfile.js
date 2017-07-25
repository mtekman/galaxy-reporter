
var gulp     = require('gulp'),
    uglify   = require('gulp-uglify'),
    clean    = require('gulp-clean'),
    concat   = require('gulp-concat'),
    eslint   = require('gulp-eslint'),
    cleancss = require('gulp-clean-css'),
    sync     = require('gulp-sync')(gulp).sync, // force no async (no /dev/fd depencency-chaining?)
    smaps    = require('gulp-sourcemaps'),      // init before sass
    sass     = require('gulp-sass'),            // source css -> resolved css.  *most* browsers do this automatically.
    gutil    = require('gulp-util'),
    lreload  = require('gulp-livereload'),     // updates through watch
    http     = require('http'),                // http server
    st       = require('st'),                  // serve/cache static files --> http
    mkdirp   = require('mkdirp'),
    babelify = require('babelify'),
    //vtrans   = require('vinyl-transform')
    source   = require('vinyl-source-stream'), // <iostream>
    htmlreplace = require('gulp-html-replace'),   // dead useful for replacing generated JS or CSS paths in static index.html
    browserify = require('browserify');       //  WebPack is recommended by the React community, but it effectively replaces Gulp.... fork later



// source -> build paths
const dirs = {
    src : 'src',
    dest: 'build'
}

const paths = {
   
    index: {
        src : 'app/index.html',
        dest: 'web/index.html'
    },

    css : {
        src : 'app/css/',
        dest: 'web/min.css'
    },

    js: {
        src : 'app/js/',
        dest: 'web/min.js'
    },
    
    react: {
        src : 'app/js/ReactComponents/',
        dest: 'web/min.js'
    }

    /*react: {
        //src : dirs.src + '/js/*.react',  // cannot pipe this in gulp as glob, declare as single file and source others
        src : 'app/js/ReactComponents/main.react',
        dest: 'web/min.js'
    }*/
}


//Main
gulp.task("build", sync(["clean", ["htmlreplace", "mkweb-js","mkweb-css"]]));
gulp.task("run", sync(["build", ["watch", "server"]]));
gulp.task('default', ['run'])


// Watch scripts
gulp.task('watch',function(){
    gulp.watch([
        paths.react.src + '/*.js',
        paths.js.src + '/*.js'],
               ["mkweb-js"]);  // react js -> babel

    return gulp.watch([paths.css.src + '/*.scss'],   ["mkweb-css"])     // css
})

// Start web server
gulp.task('server', function(cb){
    http.createServer(
        st({ path: __dirname + '/web/', index: 'index.html', cache: false})
    ).listen(3000, cb);
});


// Replace static CSS and JS
gulp.task('htmlreplace', function(){
    return gulp.src(paths.index.src)
        .pipe(htmlreplace({
            "css": 'min.css',
            "js":  'min.js'
        }))
        .pipe(concat(paths.index.dest))
        .pipe(gulp.dest('.'));
});



// == MAKE WEB FUNCTIONS ==
gulp.task("mkweb-css", function(){
    return gulp.src(paths.css.src + '/*.scss')
        .pipe(smaps.init())                         // not really needed in modern browsers which do this automatically now, but it's encouraged...
        .pipe(cleancss({compatibility:'ie8'}))
        .pipe(concat(paths.css.dest))
        .pipe(smaps.write())
        .pipe(gulp.dest('.'));
})

/*gulp.task("mkweb-js", function(){
    return gulp.src(paths.js.src)
        .pipe(uglify())
        .pipe(source(paths.js.dest))
        .pipe(gulp.dest('.'));
});*/

gulp.task("mkweb-js", sync(["intermediate-to-web", "clean-intermediate"]));

gulp.task("intermediate-to-web", ["bundleJS"], function(){
    return gulp.src('intermediate/*.js')
        .pipe(concat(paths.js.dest))
        .pipe(gulp.dest('.'));
    
})

gulp.task('bundleJS', function(){
    var browser_bundle = browserify({entries: paths.js.src + '/main.js'})    // main.js references ReactComponents so we don't have to
    
    var external_deps = ['react','react-dom'];

    // Package react and other js libs
    var t1 = browserify({require: external_deps /*,debug: true*/})
        .bundle()
        .on('error', gutil.log)
        .pipe(source('__libs.js'))
        .pipe(gulp.dest('intermediate/'));        

    // Don't lock in dev deps into app
    external_deps.forEach(function(d){
        browser_bundle.external(d)
    });

    var t2 = browser_bundle
        .transform('babelify', {presets: [ "es2015", "react"]})  // --> .babelrc if you want
        .bundle()
        .on('error', gutil.log)
        .pipe(source('__script.js'))
        .pipe(gulp.dest('intermediate/'));
        
    return t1 + " " + t2; // gives sync a clue
});



// Cleaning
gulp.task('clean-intermediate' , /*["intermediate-to-web"],*/ function(){
    return gulp.src('intermediate/**/**', {read:false})
        .pipe(clean())
})


gulp.task('clean', function(){
    mkdirp('./web', function(e){
        if (e) console.error(e);
    });

    return gulp.src('web/*', {read: false})
        .pipe(clean())
       
})

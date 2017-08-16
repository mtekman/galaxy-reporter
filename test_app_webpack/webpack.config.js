const dirs  = {  src: 'app',     dest : 'web' };
const paths = {
    index : {  src : dirs.src  + '/index.html',           dest: dirs.dest + '/index.html'    },
    css   : {  src : dirs.src  + '/css/',                 dest: dirs.dest + '/min.css'       },
    js    : {  src : dirs.src  + '/js/',                  dest: dirs.dest + '/script.js'     },
    react : {  src : dirs.src  + '/js/Panels/',  src_index: dirs.src  + '/js/main.js',      dest: dirs.dest + '/libs.js'   }
}

const path    = require('path'),
      webpack = require('webpack'),
      htmlreplace = require('html-replace-webpack-plugin'),
      htmlplug = require('html-webpack-plugin'),
      basename = require('basename'),
      extexplug = require('extract-text-webpack-plugin');

const html_plugin = new htmlplug({
    template: path.resolve(paths.index.src),
    filename: path.resolve(paths.index.dest),
    inject: 'body'
});

const html_replace = new htmlreplace([
    {   pattern: 'dummy.css',        replacement: basename( paths.css.dest ) + '.css',    },
    {   pattern: 'dummy.js',         replacement: basename( paths.js.dest) + '.js',       }
]);

const cssextract = new extexplug(basename(paths.css.dest)+".css");


module.exports = {
    entry : path.resolve(paths.react.src_index),
    output : {
        path: path.resolve(dirs.dest),
        filename: basename(paths.js.dest) + '.js'
    },
    module : {
        loaders : [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot-loader', 'jsx-loader', 'babel-loader'],
                exclude: /node_modules/
            },

//            { test: /\.json/, loader: ['json-loader'], exclude: /node_modules/},

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: cssextract.extract({
                    fallback: 'style-loader',

                    use: [{
                            loader: 'css-loader',
/*                            query: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 2,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }*/
                        }, 'sass-loader'
                    ]
                }),
            },
        ]
    },

    plugins : [ html_replace, html_plugin, cssextract ]
}

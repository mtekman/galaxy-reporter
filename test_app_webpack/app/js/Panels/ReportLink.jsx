import React from 'React';
import {link_types} from 'static/link_types.json';
import {link_map}   from 'static/link_map.json';


export default class Link extends React.Component {

    constructor(props) {
        super(props);

        this.__header = props.panel_header
        this.__title  = props.title,

        this.state = {
            class: Link.modes.none
        };     /* default */

        this.props.page = makeURL(); // build once, independent of state changes or rerenders
    }

    _onMouseEnter() {  this.setState({class: Link.modes.hover});   }
    _onMouseLeave() {  this.setState({class: Link.modes.none});    }

    makeURL(){
        // e.g. ["workflows", ["per", "flow" ]],
        let url_elements = this._getLinkElements(),
            dirname  = url_elements[0],
            pathname = url_elements[1],
            opts     = url_elements[2] || 0;

        // null => "", 0 => "sort_id=default"
        if (opts === 0) opts = Link.sort_defaults;

        return _buildURL(dirname, pathname, opts);
    }


    static _buildURL(dir, path, opts){

        if (!(dir in Link.types)){
            throw new Error(dir + " not in link types");
        }

        if (!(path in Link.types[dir])){
            throw new Error(dir + " not in link type section: " + path);
        }

        let new_dir  = Link.types[dir].__name,
            new_path = Link.types[dir][path[0]][path[1]];

        // opts - e.g. sort_id=default&order=default
        let opts_str = "";

        for (var key in opts){
            opts_str += "&" + key + "=" + opts[key];
        }

        if (opts_str !== ""){             // chomp initial '&' and add '?'
            opts_str = '?' + opts_str.slice(1,);
        }

        return new_dir + '/' + new_path + opts_str;
    }


    _getLinkElements(){
        if (!(this.__header in Link.linkmap)){
            throw new Error(this.__header + " not in linkmap");
        }

        if (!(this.__title in Link.linkmap[this.__header])){
            throw new Error(this.__title + " not in linkmap section:" +this.__header);
        }

        return Link.linkmap[this.__header][this.__title],
    }

    render() {
        return (
                <a
            className={this.state.class}
            href={this.props.page || '#'}
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}>
                {this.props.children}
            </a>
        );
    }
}

//Static vars
const Link.linkmap = { link_map };
const Link.modes   = { none : 'normal', hover : 'hover'};
const Link.types   = { link_types };

const Link.sort_defaults = {
    sort_id : 'default',
    order   : 'default'
}
import React from 'react';

// fails here, cant resolve json
//import {link_types} from 'static/link_types.json';
import linkmap  from '../static/link_map.json';

//Static vars
//const linkmap = { link_map };
const      modes   = { "none" : 'normal', "hover" : 'hover'}
//const      types   = { link_types },
const      sort_defaults = {
  "sort_id" : 'default',
  "order"   : 'default'
}

export default class Link extends React.Component {

    constructor(props) {
        super(props);

        this.__header = props.panel_header
        this.__title  = props.title,

        this.state = {
            class: modes.none
        };     /* default */

        this.props.page = this.makeURL(); // build once, independent of state changes or rerenders
    }

    _onMouseEnter() {  this.setState({class: modes.hover});   }
    _onMouseLeave() {  this.setState({class: modes.none});    }

    makeURL(){
        // e.g. ["workflows", ["per", "flow" ]],
        let url_elements = this._getLinkElements(),
            dirname  = url_elements[0],
            pathname = url_elements[1],
            opts     = url_elements[2] || 0;

        // null => "", 0 => "sort_id=default"
        if (opts === 0) opts = sort_defaults;

        return _buildURL(dirname, pathname, opts);
    }


    static _buildURL(dir, path, opts){

        if (!(dir in types)){
            throw new Error(dir + " not in link types");
        }

        if (!(path in types[dir])){
            throw new Error(dir + " not in link type section: " + path);
        }

        let new_dir  = types[dir].__name,
            new_path = types[dir][path[0]][path[1]];

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
        if (!(this.__header in linkmap)){
            throw new Error(this.__header + " not in linkmap");
        }

        if (!(this.__title in linkmap[this.__header])){
            throw new Error(this.__title + " not in linkmap section:" +this.__header);
        }

        return linkmap[this.__header][this.__title];
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

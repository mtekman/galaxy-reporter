import React from 'react';

// fails here, cant resolve json
import types from '../static/link_types.json';
import linkmap  from '../static/link_map.json';
//const linkmap = { link_map };
//const      types   = { link_types },

//Static vars
const modes   = { "none" : 'normalcy', "hover" : 'hovercy'}
const sort_defaults = {
  "sort_id" : 'default',
  "order"   : 'default'
}

export default class Link extends React.Component {

  constructor(props) {
    super(props);

    this.__header = props.panel_header
    this.__title  = props.title,

    this.state = {
      class: modes.none,
      url : this.makeURL()
    };     /* default */
  }

  //setState(state){   this.state.class = state.class;     }
  _onMouseEnter() {  this.setState({class: modes.hover});  }
  _onMouseLeave() {  this.setState({class: modes.none}); }

  makeURL(){
    //console.log("constructing URL");
    // e.g. ["workflows", ["per", "flow" ]],
    let url_elements = this._getLinkElements(),
    dirname  = url_elements[0],
    pathname = url_elements[1],
    opts     = url_elements[2] || 0;

    // null => "", 0 => "sort_id=default"
    if (opts === 0) opts = sort_defaults;

    return Link._buildURL(dirname, pathname, opts);
  }


  static _buildURL(dir, path, opts){

    let typer = types.type,
        sub1 = path[0],
        sub2 = path[1];

    if (!(dir in typer)){
      throw new Error(dir + " not in link types");
    }

    if (!(sub1 in typer[dir])){
      throw new Error(sub1 + " not in link type section: " + typer[dir]);
    }

    if (!(sub2 in typer[dir][sub1])){
      throw new Error(sub2 + " not in link type section: " + typer[dir][sub1]);
    }


    let new_dir  = typer[dir].__name,
    new_path = typer[dir][sub1][sub2];

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
  var that = this;

  return (
    <a
      className={this.state.class}
      href={this.state.url || '#'}
      onMouseEnter={this._onMouseEnter.bind(that)}
      onMouseLeave={this._onMouseLeave.bind(that)}>
      {this.__title}
      {this.props.children}
    </a>
  );
}
}

import React from 'react';
import Link from './ReportLink.jsx';

import classnames from 'classnames';

export default class PanelSection extends React.Component {

   constructor(props)
   {
      super(props);

      this.header    = props.section_header;
      this.title_map = props.section_titles;

      this.state = {
         class: "hidelinks"
      }
      //console.log( this.header, this.title_map);
      this.__generateLinksInPanel();
   }

   __generateLinksInPanel(){
      var link_obs = [];
      for (var title in this.title_map){
         link_obs.push(
            this.__generateSingleLink(this.header, title)
         );
      }
      return link_obs; //.forEach( x=> x.render());
   }


   __generateSingleLink(header, title){
      return (
         <li key={header + "_" + title}>
            <Link panel_header={header} title={title} ></Link>
         </li>
      );
   }

   hideLinks(){  this.setState({class: classnames("hidelinks")}); }
   showLinks(){  this.setState({class: classnames("showlinks")}); }


   render(){
      var that = this;

      return (
         <div
            className={this.state.class}
            onMouseLeave={this.hideLinks.bind(that)}
            onMouseEnter={this.showLinks.bind(that)}
            >
               <h1>{this.header}</h1>
               <div className="links">
                  {this.__generateLinksInPanel()}
               </div>
            </div>
         );
      }

   }

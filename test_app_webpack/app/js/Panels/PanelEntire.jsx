/* React cannot render multiple components of different types, so must nest
   everything... this will change in an update */

import React from 'react';
import PanelSection from './PanelSection.jsx';
import linkmap from '../static/link_map.json';

import classnames from 'classnames';

export default class PanelEntire extends React.Component {

   constructor(props){
      super(props);
   }

   _generateAllPanels(){
      var panel_obs = [];
      for (var head in linkmap){
         panel_obs.push(
            this._generateSinglePanel( head )
         );
      }
      return panel_obs;
   }


   _generateSinglePanel( header ){
      return <PanelSection
         key={header}
         section_header={header}
         section_titles={linkmap[header]} >
      </PanelSection>;
   }

   render(){
      let classes = classnames('panels_main');

      return (
         <div
            className={classes} >
            {this._generateAllPanels()}
         </div>
      )
   }
}

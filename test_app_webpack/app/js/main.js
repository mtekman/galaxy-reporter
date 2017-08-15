import ReactDOM from 'react-dom';
import React from 'react';

import PanelSection from './Panels/PanelSection.jsx';


import '../css/style.scss';
// Maybe scss allows for CommonJS names --> pass to Link


// imports do not import other imports, heh. Only default exports.
import linkmap  from './static/link_map.json';
//console.log(linkmap);

function drawOne(){
	for (var header in linkmap){
		ReactDOM.render(
			<PanelSection section_header={header} section_titles={linkmap[header]} ></PanelSection>,
			document.getElementById('react-sidepanel')
		);
		return 0
	}
}

drawOne();

/*ReactDOM.render(
	<Link panel_header="users" title="User disk usage" ></Link>,
	document.getElementById('react-link')
);*/

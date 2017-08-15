import ReactDOM from 'react-dom';
import React from 'react';

import PanelSection from './Panels/PanelSection.jsx';


import '../css/style.scss';
// Maybe scss allows for CommonJS names --> pass to Link


// imports do not import other imports, heh. Only default exports.
import linkmap  from './static/link_map.json';
//console.log(linkmap);


function generatePanel(header){
	console.log("generate", header, linkmap[header]);

		return <PanelSection
					section_header={header}
					section_titles={linkmap[header]} >
			</PanelSection>;
}

function drawOne(){
	for (var header in linkmap){
		ReactDOM.render(
			generatePanel(header),
			document.getElementById('react-sidepanel')
		);
	}
}


function drawAll(){
	var sections = [];

	for (var header in linkmap){
		sections.push(
			generatePanel(header)
		);
	}

	ReactDOM.render(
		sections,
		document.getElementById('react-sidepanel')
	);
}

drawOne();
//drawAll();

/*ReactDOM.render(
	<Link panel_header="users" title="User disk usage" ></Link>,
	document.getElementById('react-link')
);*/

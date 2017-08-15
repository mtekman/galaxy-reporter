import ReactDOM from 'react-dom';
import React from 'react';

import Link from './Panels/ReportLink.jsx';


import '../css/style.scss';
// Maybe scss allows for CommonJS names --> pass to Link


// imports do not import other imports, heh. Only default exports.
/*import linkmap  from './static/link_map.json';
//console.log(linkmap);

for (var header in linkmap){
	ReactDOM.render(
		<PanelSection section_header=header section_titles={linkmap.header} >header</PanelSection>,
		document.getElementById('react-sidepanel')
	);
}*/


ReactDOM.render(
	<Link panel_header="users" title="User disk usage" ></Link>,
	document.getElementById('react-link')
);

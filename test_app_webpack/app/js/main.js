import ReactDOM from 'react-dom';
import React from 'react';


import '../css/style.scss';
// Must include .scss for it to be generated into min

import PanelEntire from './Panels/PanelEntire.jsx';


ReactDOM.render(
	<PanelEntire ></PanelEntire>,
	document.getElementById('react-link')
);

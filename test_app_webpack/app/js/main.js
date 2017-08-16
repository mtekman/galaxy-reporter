import ReactDOM from 'react-dom';
import React from 'react';


import '../css/style.scss';
// Maybe scss allows for CommonJS names --> pass to Link

import PanelEntire from './Panels/PanelEntire.jsx';


ReactDOM.render(
	<PanelEntire ></PanelEntire>,
	document.getElementById('react-link')
);

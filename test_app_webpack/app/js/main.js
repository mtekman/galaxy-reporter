import ReactDOM from 'react-dom';
import React from 'react';

//import {data} from 'data.js';
import Link from './Panels/ReportLink.jsx';
/*import FilterTable   from './ReactComponents/FilterTable.jsx';
import Link          from './ReactComponents/Link.jsx';
import ShoppingList  from './ReactComponents/ShoppingList.jsx';
import Game          from './ReactComponents/TestComponent.jsx';*/


require('../css/style.scss');


console.log("test")

ReactDOM.render(
	<Link panel_header="users" title="User disk usage" >Test Link</Link>,
	document.getElementById('react-link')
);

/*
ReactDOM.render(
	<ShoppingList name="Test" />,
	document.getElementById('react-shopping')
);
*/

/*
ReactDOM.render(
	<FilterTable data={data} />,
	<div id="react-table" ></div>
);

ReactDOM.render(
	<Game />,
	<div id="react-testcomponent" ></div>
);
*/

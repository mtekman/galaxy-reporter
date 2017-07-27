
import React from 'react';
import ReactDOM from 'react-dom';

import {data} from './data.js';
import FilterTable   from './ReactComponents/FilterTable.jsx';
import Link          from './ReactComponents/Link.jsx';
import ShoppingList  from './ReactComponents/ShoppingList.jsx';
import Game          from './ReactComponents/TestComponent.jsx';

require('../css/style.scss');

ReactDOM.render(
	<Link page="http://www.test.com">Test Link</Link>,
	document.getElementById('react-link')
);

ReactDOM.render(
	<ShoppingList name="Test" />,
	document.getElementById('react-shopping')
);

/*ReactDOM.render(
	<FilterTable data={data} />,
	<div id="react-table" ></div>
);

ReactDOM.render(
	<Game />,
	<div id="react-testcomponent" ></div>
);*/

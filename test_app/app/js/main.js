
import React from 'react';
import ReactDOM from 'react-dom';

import {data} from './data';
import FilterTable   from './ReactComponents/FilterTable';
import Link          from './ReactComponents/Link';
import ShoppingList  from './ReactComponents/ShoppingList';
import Game          from './ReactComponents/TestComponent';



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


import React from 'react';
import ReactDOM from 'react-dom';

import {data} from './data';
import FilterTable from './ReactComponents/FilterTable';

 
ReactDOM.render(
    <FilterTable data={data}/>,
    document.getElementById('filterTable')
);



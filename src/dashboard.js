import React from 'react';
import ReactDOM from 'react-dom';

import Authentication from './pages/Dashboard/Dashboard';

import './index.css';
import './pages/Dashboard/css/dashboard.css';

ReactDOM.render(
    <Authentication />,
    document.getElementById('root')
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./pages/Dashboard/Dashboard', () => {
        console.log('Accepting the updated module.');
        const Next = require('./pages/Dashboard/Dashboard');
        ReactDOM.render(<Next />, document.getElementById('root'));
    });
}
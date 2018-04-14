import React from 'react';
import ReactDOM from 'react-dom';

import Authentication from './pages/Authentication/Authentication';

import './index.css';
import './pages/Authentication/css/authentication.css';

ReactDOM.render(
    <Authentication />,
    document.getElementById('root')
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./pages/Authentication/Authentication', () => {
        console.log('Accepting the updated module.');
        const Next = require('./pages/Authentication/Authentication');
        ReactDOM.render(<Next />, document.getElementById('root'));
    });
}
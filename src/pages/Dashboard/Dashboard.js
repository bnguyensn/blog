'use strict';

import React, {PureComponent} from 'react';

import ControlPanel from './components/ControlPanel';
import Console from './components/Console';
import Paper from './components/Paper';

import './css/dashboard.css';

class Dashboard extends PureComponent {
    render() {
        return (
            <div id='dashboard-page'>
                <Console />
                <Paper />
            </div>
        )
    }
}

export default Dashboard
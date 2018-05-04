'use strict';

import React, {PureComponent} from 'react';

import ControlPanel from './ControlPanel/ControlPanel';
import Editor from './Editor/Editor';

import './dashboard.css';

class Dashboard extends PureComponent {
    render() {
        return (
            <div id='dashboard-page'>
                <ControlPanel />
                <Editor />
            </div>
        )
    }
}

export default Dashboard
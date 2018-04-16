'use strict';

import React, {PureComponent} from 'react';

import ControlPanel from './ControlPanel/ControlPanel';
import ArticleEditor from './ArticleEditor/ArticleEditor';

import './dashboard.css';

class Dashboard extends PureComponent {
    render() {
        return (
            <div id='dashboard-page'>
                <ControlPanel />
                <ArticleEditor />
            </div>
        )
    }
}

export default Dashboard
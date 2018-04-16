'use strict';

import React, {PureComponent} from 'react';

import Button from '../Button/Button';

import './control-panel.css';

function createNewArticle() {

    // Open a new article window


}

class ControlPanel extends PureComponent {
    render() {
        return (
            <div id='cp'>
                <Button size='large' icon='add_box' color='c648572'
                        command={createNewArticle} />
                <Button size='large' icon='inbox' color='grey100' />
                <Button size='large' icon='archive' color='grey100' />
                <Button size='large' icon='exit_to_app' color='grey100' />
            </div>
        )
    }
}

export default ControlPanel
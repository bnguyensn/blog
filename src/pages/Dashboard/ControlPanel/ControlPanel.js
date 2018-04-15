'use strict';

import React, {PureComponent} from 'react';

import Button from '../Button/Button';

function createNewArticle() {

    // Open a new article window


}

class ControlPanel extends PureComponent {
    render() {
        return (
            <div id='control-panel'>
                <Button size='large' icon='add_box' color='light' bkgColor='green600'
                        command={createNewArticle} />
                <Button size='large' icon='inbox' color='light' />
                <Button size='large' icon='archive' color='light' />
                <Button size='large' icon='exit_to_app' color='light' />
            </div>
        )
    }
}

export default ControlPanel
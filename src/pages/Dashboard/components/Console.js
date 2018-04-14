'use strict';

import React, {PureComponent} from 'react';

class Console extends PureComponent {
    render() {
        return (
            <div contentEditable>

            </div>
        )
    }
}

class ConsoleWindow extends PureComponent {
    render() {
        return (
            <div id='console-window'>
                <Console />
            </div>
        )
    }
}

export default ConsoleWindow
'use strict';

import React, {PureComponent} from 'react';
import Button from './Button';

class PaperControlPanel extends PureComponent {
    render() {
        return (
            <div id='paper-control-panel'>
                <Button type='format' icon='format_bold' command='bold' tooltipText='Bold' />
                <Button type='format' icon='format_italic' command='italic' tooltipText='Italic' />
                <Button type='format' icon='format_underlined' command='underline' tooltipText='Underline' />
            </div>
        )
    }
}

class PaperSectionTitle extends PureComponent {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            // Prevent submission, focus on body instead
            e.preventDefault();
            document.getElementById('paper-section-body').firstElementChild.focus();
        }
    }

    render() {
        return (
            <div id='paper-section-title' className='paper-section'
                   >
                <input type='text'
                       onKeyDown={this.handleKeyDown}>
                </input>
            </div>
        )
    }
}

class PaperSectionBody extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='paper-section-body' className='paper-section'>
                <div contentEditable />
            </div>
        )
    }
}

class Paper extends PureComponent {
    render() {
        return (
            <div id='paper'>
                <PaperSectionTitle />
                <PaperControlPanel />
                <PaperSectionBody />
            </div>
        )
    }
}

export default Paper
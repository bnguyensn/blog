'use strict';

import React, {PureComponent} from 'react';

import EditorControl from './Components/EditorControl';

import handleFormat from '../../../js/handleFormat';

import './article-editor.css';

// TODO: Put in when needed
class TitleSection extends PureComponent {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        // Make the default paragraph separator consistent
        document.execCommand('defaultParagraphSeparator', false, 'div');
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            // Prevent submission, focus on body instead
            e.preventDefault();
            document.getElementById('ae-section-body').firstElementChild.focus();
        }
    }

    render() {
        return (
            <div id='ae-section-title' className='ae-section'>
                <input type='text'
                       onKeyDown={this.handleKeyDown}>
                </input>
            </div>
        )
    }
}

class BodySection extends PureComponent {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.state = {
            shiftPressed: false
        };
    }

    handleKeyDown(e) {
        switch (e.keyCode) {
            case 9:  // Tab
                e.preventDefault();
                this.state.shiftPressed ? handleFormat('outdent') : handleFormat('indent');
                break;
            case 16:  // Shift
                this.setState({
                    shiftPressed: true
                });
                break;
        }
    }

    handleKeyUp(e) {
        switch (e.keyCode) {
            case 16:  // Shift
                this.setState({
                    shiftPressed: false
                });
                break;
        }
    }

    render() {
        return (
            <div id='ae-section-body' className='ae-section'>
                <div id='ae-section-body-editable' contentEditable
                     onKeyDown={this.handleKeyDown}
                     onKeyUp={this.handleKeyUp} />
            </div>
        )
    }
}

class Editor extends PureComponent {
    render() {
        return (
            <div id='ae'>
                {/*<TitleSection />*/}
                {/*<ControlPanel />*/}
                <BodySection />
            </div>
        )
    }
}

export default Editor
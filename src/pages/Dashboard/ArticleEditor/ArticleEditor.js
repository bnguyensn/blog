'use strict';

import React, {PureComponent} from 'react';

import Button from '../Button/Button';

import './article-editor.css';

function handleCreateLink() {

    // Ask user which link to create
    const linkURI = '';

    // Create link
    document.execCommand('createLink', false, linkURI);
}

function handleInsertPhoto() {

    // Ask user which photo to insert
    const photoURI = '';

    // Insert photo
    document.execCommand('insertImage', false, photoURI);
}

function handleFormat(formatCommand) {
    document.execCommand(formatCommand, false, null);
}

class ControlPanel extends PureComponent {
    render() {
        return (
            <div id='ae-control-panel'>
                <Button icon='format_bold' color='light' tooltipText='Bold'
                        command={handleFormat} commandArg='bold' />
                <Button icon='format_italic' color='light' tooltipText='Italic'
                        command={handleFormat} commandArg='italic' />
                <Button icon='format_underlined' color='light' tooltipText='Underline'
                        command={handleFormat} commandArg='underline' />
                <Button icon='format_indent_increase' color='light' tooltipText='Increase indent'
                        command={handleFormat} commandArg='indent' />
                <Button icon='format_indent_decrease' color='light' tooltipText='Decrease indent'
                        command={handleFormat} commandArg='outdent' />
                <Button icon='format_list_bulleted' color='light' tooltipText='Bulleted list'
                        command={handleFormat} commandArg='insertUnorderedList' />
                <Button icon='format_list_numbered' color='light' tooltipText='Numbered list'
                        command={handleFormat} commandArg='insertOrderedList' />
                <Button icon='insert_link' color='light' tooltipText='Insert link'
                        command={handleCreateLink} />
                <Button icon='insert_photo' color='light' tooltipText='Insert image'
                        command={handleInsertPhoto} />
            </div>
        )
    }
}

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
            case 32:
                console.log('Spacebar');
                break;
            case 9:
                e.preventDefault();
                this.state.shiftPressed ? handleFormat('outdent') : handleFormat('indent');
                break;
            case 16:
                this.setState({
                    shiftPressed: true
                });
                break;
        }
    }

    handleKeyUp(e) {
        switch (e.keyCode) {
            case 16:
                this.setState({
                    shiftPressed: false
                });
                break;
        }
    }

    render() {
        return (
            <div id='ae-section-body' className='ae-section'>
                <div contentEditable
                     onKeyDown={this.handleKeyDown}
                     onKeyUp={this.handleKeyUp} />
            </div>
        )
    }
}

class ArticleEditor extends PureComponent {
    render() {
        return (
            <div id='ae'>
                <TitleSection />
                <ControlPanel />
                <BodySection />
            </div>
        )
    }
}

export default ArticleEditor
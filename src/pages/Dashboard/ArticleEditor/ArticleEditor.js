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
    }

    render() {
        return (
            <div id='ae-section-body' className='ae-section'>
                <div contentEditable />
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
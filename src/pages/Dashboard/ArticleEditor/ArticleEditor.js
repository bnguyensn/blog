'use strict';

import React, {PureComponent} from 'react';

import Button from '../../Components/Button/Button';
import {LinkLightbox, ImageLightbox} from "./Components/Lightbox";

import './article-editor.css';

import {insertLinkAtRange} from "../../../js/dom-insertion";
import handleFormat from '../../../js/handleFormat';

function getRange() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount) {
        return selection.getRangeAt(0);
    }
    return null
}





class ControlPanel extends PureComponent {
    constructor(props) {
        super(props);
        this.startLinkProcess = this.startLinkProcess.bind(this);
        this.endLinkProcess = this.endLinkProcess.bind(this);
        this.hideLinkLightbox = this.hideLinkLightBox.bind(this);
        this.insertLink = this.insertLink.bind(this);
        this.startImageProcess = this.startImageProcess.bind(this);
        this.hideImageLightbox = this.hideImageLightBox.bind(this);
        this.insertImage = this.insertImage.bind(this);
        this.state = {
            linkLightboxShown: false,
            currentRange: null,
            imageLightboxShown: false,
        };
    }

    startLinkProcess() {
        this.setState({
            linkLightboxShown: true,
            currentRange: getRange()
        });
    }

    endLinkProcess() {

    }

    hideLinkLightBox() {
        this.setState({
            linkLightboxShown: false
        });
    }

    insertLink(textToDisplay, link) {
        insertLinkAtRange(this.state.currentRange, textToDisplay, link);
    }

    startImageProcess() {
        this.setState({
            imageLightboxShown: true
        });
    }

    hideImageLightBox() {
        this.setState({
            imageLightboxShown: false
        });
    }

    insertImage() {

    }

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
                        command={this.startLinkProcess} />
                <Button icon='insert_photo' color='light' tooltipText='Insert image'
                        command={this.startImageProcess} />

                <LinkLightbox shown={this.state.linkLightboxShown}
                              hideLightBox={this.hideLinkLightBox}
                              insertLink={this.insertLink} />
                <ImageLightbox shown={this.state.imageLightboxShown}
                               hideLightBox={this.hideImageLightBox}
                               insertImage={this.insertImage} />
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
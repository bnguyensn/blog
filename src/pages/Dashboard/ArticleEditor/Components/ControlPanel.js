'use strict';

import React, {PureComponent} from 'react';

import {LinkLightbox, ImageLightbox} from './Lightbox';
import MIcon from '../../../Components/MIcon';

import {insertLinkAtRange, getRange} from '../../../../js/dom-insertion';
import handleFormat from '../../../../js/handleFormat';

import './control-panel.css';

/**
 * BUTTON FOR CONTROL PANEL
 * */

function ButtonTooltip(props) {
    return (
        <div className={`cp-btn-tt ${props.show ? '' : 'hidden'}`}>
            {props.tooltipText}
        </div>
    )
}

class Button extends PureComponent {
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.state = {
            hover: false
        }
    }

    handleMouseEnter() {
        this.setState({
            hover: true
        });
    }

    handleMouseLeave() {
        this.setState({
            hover: false
        });
    }

    handleMouseClick() {
        Array.isArray(this.props.handleClickArgs)
            ? this.props.handleClick(...this.props.handleClickArgs)
            : this.props.handleClick(this.props.handleClickArgs);
    }

    render() {
        return (
            <div className={`cp-btn ${size} ${bkgColor}`}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}
                 onClick={this.handleMouseClick}>
                <MIcon icon={this.props.icon} color='light' size={this.props.size ? this.props.size : null} />
                <ButtonTooltip show={this.state.hover} tooltipText={this.props.tooltipText} />
            </div>
        )
    }
}

/**
 * CONTROL PANEL
 * */

class ControlPanel extends PureComponent {
    constructor(props) {
        super(props);

        // Lightbox
        this.hideLightbox = this.hideLightbox.bind(this);
        // Link methods
        this.startLinkProcess = this.startLinkProcess.bind(this);
        this.insertLink = this.insertLink.bind(this);
        // Image methods
        this.startImageProcess = this.startImageProcess.bind(this);

        this.state = {
            currentRange: null,
            linkLightboxShown: false,
            imageLightboxShown: false,
        };


        this.endLinkProcess = this.endLinkProcess.bind(this);

    }

    // Lightbox method

    hideLightbox(lightboxName) {
        this.setState({
            [`${lightboxName}Shown`]: false
        })
    }

    // Insert link methods

    startLinkProcess() {
        this.setState({
            linkLightboxShown: true,
            currentRange: getRange()
        });
    }

    insertLink(textToDisplay, link) {
        insertLinkAtRange(this.state.currentRange, textToDisplay, link);
    }

    // Insert image methods

    startImageProcess() {
        this.setState({
            imageLightboxShown: true
        });
    }

    render() {
        return (
            <div id='ae-control-panel'>

                <Button icon='format_bold' tooltipText='Bold'
                        handleClick={handleFormat} handleClickArgs={['bold', null]} />
                <Button icon='format_italic' tooltipText='Italic'
                        handleClick={handleFormat} handleClickArgs={['italic', null]} />
                <Button icon='format_underlined' tooltipText='Underline'
                        handleClick={handleFormat} handleClickArgs={['underline', null]} />

                <span className='cp-divider'>|</span>

                <Button icon='title' tooltipText='Format as title'
                        handleClick={handleFormat} handleClickArgs={['formatBlock', '<h3>']} />
                <Button icon='title' size='md-075em' tooltipText='Format as subtitle'
                        handleClick={handleFormat} handleClickArgs={['formatBlock', '<h4>']} />

                <span className='cp-divider'>|</span>

                <Button icon='format_indent_increase' tooltipText='Increase indent'
                        handleClick={handleFormat} handleClickArgs={['indent', null]} />
                <Button icon='format_indent_decrease' tooltipText='Decrease indent'
                        handleClick={handleFormat} handleClickArgs={['outdent', null]} />
                <Button icon='format_list_bulleted' tooltipText='Bulleted list'
                        handleClick={handleFormat} handleClickArgs={['insertUnorderedList', null]} />
                <Button icon='format_list_numbered' tooltipText='Numbered list'
                        handleClick={handleFormat} handleClickArgs={['insertOrderedList', null]} />

                <span className='cp-divider'>|</span>

                <Button icon='insert_link' tooltipText='Insert link'
                        handleClick={this.startLinkProcess} />
                {/*<Button icon='insert_photo' tooltipText='Insert image'
                        handleClick={this.startImageProcess} />*/}

                <LinkLightbox shown={this.state.linkLightboxShown}
                              hideLightbox={this.hideLightbox}
                              insertLink={this.insertLink} />
                {/*<ImageLightbox shown={this.state.imageLightboxShown}
                               hideLightbox={this.hideLightbox}
                               insertImage={this.insertImage} />*/}
            </div>
        )
    }
}
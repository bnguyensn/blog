'use strict';

import React, {PureComponent} from 'react';

import {LinkLightBox, ImageLightBox} from './Lightbox';
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
        this.startLinkProcess = this.startLinkProcess.bind(this);
        this.endLinkProcess = this.endLinkProcess.bind(this);
        this.hideLinkLightBox = this.hideLinkLightBox.bind(this);
        this.insertLink = this.insertLink.bind(this);
        this.startImageProcess = this.startImageProcess.bind(this);
        this.hideImageLightBox = this.hideImageLightBox.bind(this);
        this.insertImage = this.insertImage.bind(this);
        this.state = {
            linkLightBoxShown: false,
            currentRange: null,
            imageLightBoxShown: false,
        };
    }

    startLinkProcess() {
        this.setState({
            linkLightBoxShown: true,
            currentRange: getRange()
        });
    }

    endLinkProcess() {

    }

    hideLinkLightBox() {
        this.setState({
            linkLightBoxShown: false
        });
    }

    insertLink(textToDisplay, link) {
        insertLinkAtRange(this.state.currentRange, textToDisplay, link);
    }

    startImageProcess() {
        this.setState({
            imageLightBoxShown: true
        });
    }

    hideImageLightBox() {
        this.setState({
            imageLightBoxShown: false
        });
    }

    insertImage() {

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
                <Button icon='insert_photo' tooltipText='Insert image'
                        handleClick={this.startImageProcess} />

                <LinkLightBox shown={this.state.linkLightBoxShown}
                              hideLightBox={this.hideLinkLightBox}
                              insertLink={this.insertLink} />
                <ImageLightBox shown={this.state.imageLightBoxShown}
                               hideLightBox={this.hideImageLightBox}
                               insertImage={this.insertImage} />
            </div>
        )
    }
}
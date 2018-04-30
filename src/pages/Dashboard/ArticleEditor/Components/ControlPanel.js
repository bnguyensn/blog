'use strict';

import React, {PureComponent} from 'react';

import {LinkLightBox, ImageLightBox} from './Lightbox';
import MIcon from '../../../Components/MIcon';

import {insertLinkAtRange} from '../../../../js/dom-insertion';

import './control-panel.css';

/**
 * BUTTONS FOR CONTROL PANEL
 * */

function ButtonTooltip(props) {
    return (
        <div className={`btn-tt ${props.show ? '' : 'hidden'}`}>
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
        this.props.handleClick(...this.props.handleClickArgs);
    }

    render() {
        // Some explanations:
        // - Optional ${this.props.size} guidelines specified in button.css. Default = body font size
        // - Optional ${this.props.bkgColor} guidelines specified in button.css. Default = no bkgColor
        // - <MIcon/>'s color guidelines are in index.css
        // - <ButtonTooltip/> is only created if a tooltipText is passed
        const size = this.props.size ? this.props.size : '';
        const bkgColor = this.props.bkgColor ? this.props.bkgColor : '';
        return (
            <div className={`btn ${size} ${bkgColor}`}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}
                 onClick={this.handleMouseClick}>
                <MIcon icon={this.props.icon} color={this.props.color} />
                {
                    this.props.tooltipText ?
                        <ButtonTooltip show={this.state.hover} tooltipText={this.props.tooltipText} /> :
                        null
                }
            </div>
        )
    }
}

/**
 * CONTROL PANEL
 * */

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

    static handleFormat(commandName, valueArg=null) {
        document.execCommand(commandName, false, valueArg);
    }

    render() {
        return (
            <div id='ae-control-panel'>

                <Button icon='format_bold' color='light' tooltipText='Bold'
                        handleClick={ControlPanel.handleFormat} handleClickArgs={['bold', null]} />
                <Button icon='format_italic' color='light' tooltipText='Italic'
                        handleClick={ControlPanel.handleFormat} handleClickArgs={['italic', null]} />
                <Button icon='format_underlined' color='light' tooltipText='Underline'
                        handleClick={ControlPanel.handleFormat} handleClickArgs={['underline', null]} />

                <span className='cp-divider'>|</span>

                <Button icon='title' color='light' tooltipText='Underline'
                        handleClick={ControlPanel.handleFormat} handleClickArgs={['', null]} />

                <span className='cp-divider'>|</span>

                <Button icon='format_indent_increase' color='light' tooltipText='Increase indent'
                        handleClick={ControlPanel.handleFormat} handleClickArgs={['indent', null]} />
                <Button icon='format_indent_decrease' color='light' tooltipText='Decrease indent'
                        handleClick={ControlPanel.handleFormat} handleClickArgs={['outdent', null]} />
                <Button icon='format_list_bulleted' color='light' tooltipText='Bulleted list'
                        handleClick={ControlPanel.handleFormat} handleClickArgs={['insertUnorderedList', null]} />
                <Button icon='format_list_numbered' color='light' tooltipText='Numbered list'
                        handleClick={ControlPanel.handleFormat} handleClickArgs={['insertOrderedList', null]} />

                <span className='cp-divider'>|</span>


                <Button icon='insert_link' color='light' tooltipText='Insert link'
                        handleClick={this.startLinkProcess} />
                <Button icon='insert_photo' color='light' tooltipText='Insert image'
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
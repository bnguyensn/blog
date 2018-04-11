'use strict';

import React, {PureComponent} from 'react';

import MIcon from './MIcon';

function PaperControlButtonTooltip(props) {
    return (
        <div className={`paper-cp-btn-tt ${props.show ? '' : 'hidden'}`}>
            {props.tooltipText}
        </div>
    )
}

class PaperControlButton extends PureComponent {
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
        // Show tooltip
        this.setState({
            hover: true
        });
    }

    handleMouseLeave() {
        // Hide tooltip
        this.setState({
            hover: false
        });
    }

    handleMouseClick() {
        // Run command
        document.execCommand(this.props.command, false, null);
    }

    render() {
        return (
            <div className='paper-cp-btn'
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}
                 onClick={this.handleMouseClick}>
                <MIcon icon={this.props.icon} light />
                <PaperControlButtonTooltip show={this.state.hover}
                                           tooltipText={this.props.tooltipText} />
            </div>
        )
    }
}

class PaperControlPanel extends PureComponent {
    render() {
        return (
            <div id='paper-control-panel'>
                <PaperControlButton icon='format_bold' command='bold' tooltipText='Bold' />
                <PaperControlButton icon='format_italic' command='italic' tooltipText='Italic' />
                <PaperControlButton icon='format_underlined' command='underline' tooltipText='Underline' />
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
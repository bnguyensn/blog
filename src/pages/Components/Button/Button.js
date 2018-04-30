'use strict';

import React, {PureComponent} from 'react';

import MIcon from '../MIcon';

import './button.css';

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
        this.props.command(this.props.commandArg);
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

export default Button
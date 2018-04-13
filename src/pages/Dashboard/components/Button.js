'use strict';

import React, {PureComponent} from 'react';

import MIcon from './MIcon';

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
        if (this.props.type === 'format') {
            // Run format command
            document.execCommand(this.props.command, false, null);
        }
    }

    render() {
        return (
            <div className='btn'
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}
                 onClick={this.handleMouseClick}>
                <MIcon icon={this.props.icon} light />
                <ButtonTooltip show={this.state.hover}
                                           tooltipText={this.props.tooltipText} />
            </div>
        )
    }
}

export default Button
'use strict';

import React, {PureComponent} from 'react';

import MIcon from './MIcon';

function PaperControlButtonTooltip(props) {
    return (
        <div className={`paper-control-btn-tt ${props.show ? '' : 'hidden'}`}>
            {props.tooltipText}
        </div>
    )
}

class PaperControlButton extends PureComponent {
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
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

    render() {
        return (
            <div className='paper-control-btn'
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
                <MIcon icon={props.icon} />
                <PaperControlButtonTooltip show={this.state.hover} />
            </div>
        )
    }
}

class PaperControl extends PureComponent {
    render() {
        return (
            <div className='paper-control'>

            </div>
        )
    }
}

class Section extends PureComponent {
    render() {
        return (
            <div className='paper-section' contentEditable>

            </div>
        )
    }
}

class Paper extends PureComponent {
    render() {
        return (
            <div id='paper'>

            </div>
        )
    }
}

export default Paper
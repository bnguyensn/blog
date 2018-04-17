'use strict';

import React, {PureComponent} from 'react';

function Button(props) {
    const color = props.color ? props.color : 'standard';

    return (
        <div className={`lightbox-btn ${color}`}>
            {props.text}
        </div>
    )
}

class LightBox extends PureComponent {
    constructor(props) {
        super(props);
        this.hideLightBox = this.hideLightBox.bind(this);
        this.state = {
            hidden: true
        }
    }

    hideLightBox(e) {
        e.stopPropagation();
        this.setState({
            hidden: false
        });
    }

    render() {
        const hidden = this.state.hidden ? 'hidden' : '';

        return (
            <div className={`lightbox-overlay ${hidden}`} onClick={this.hideLightBox}>
                <div className='lightbox'>
                    <span className='lightbox-title'>{this.props.title}</span>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class LinkLightBox extends PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            textToDisplay: '',
            link: ''
        }
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <LightBox title='Edit Link'>
                <label>
                    <span>Text to display:</span>
                    <input type='text' name='textToDisplay' value={this.state.textToDisplay}
                           onChange={this.handleInputChange} />
                </label>
                <label>
                    <span>Link to:</span>
                    <input type='text' name='link' value={this.state.link}
                           onChange={this.handleInputChange} />
                </label>
                <div className='lightbox-btn-row'>
                    <Button text='CANCEL' color='grey' />
                    <Button text='OK' />
                </div>
            </LightBox>
        )
    }
}

export {
    LinkLightBox
};
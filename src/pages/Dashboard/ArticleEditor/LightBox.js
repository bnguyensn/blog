'use strict';

import React, {PureComponent} from 'react';

import './lightbox.css';

function Button(props) {
    const color = props.color ? props.color : 'standard';

    return (
        <div className={`lightbox-btn ${color}`} onClick={props.handleClick}>
            {props.text}
        </div>
    )
}

class LightBox extends PureComponent {
    constructor(props) {
        super(props);
        this.hideLightBox = this.hideLightBox.bind(this);
    }

    hideLightBox(e) {
        e.stopPropagation(e);
        this.props.hideLightBox();
    }

    static stopPropagation(e) {
        e.stopPropagation();
    }

    render() {
        const hidden = this.props.shown ? '' : 'hidden';

        return (
            <div className={`lightbox-overlay ${hidden}`} onClick={this.hideLightBox}>
                <div className='lightbox' onClick={LightBox.stopPropagation}>
                    <span className='lightbox-title'>{this.props.title}</span>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

/** ********** LINK LIGHTBOX ********** **/

class LinkLightBox extends PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.insertLink = this.insertLink.bind(this);
        this.state = {
            textToDisplay: '',
            link: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.shown === true) {
            return {
                textToDisplay: window.getSelection().toString(),
                link: ''
            }
        }

        return null
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    insertLink() {
        if (this.state.textToDisplay && this.state.link) {
            this.props.hideLightBox();
            this.props.insertLink(this.state.textToDisplay, this.state.link);
        }
    }

    render() {
        return (
            <LightBox title='Edit Link'
                      shown={this.props.shown}
                      hideLightBox={this.props.hideLightBox}>

                <label className='lightbox-label'>
                    <span>Text to display:</span>
                    <input type='text'
                           name='textToDisplay'
                           value={this.state.textToDisplay}
                           onChange={this.handleInputChange} />
                </label>

                <label className='lightbox-label'>
                    <span>Link to:</span>
                    <input type='text'
                           name='link'
                           value={this.state.link}
                           onChange={this.handleInputChange} />
                </label>

                <div className='lightbox-btn-row'>
                    <Button text='CANCEL'
                            color='grey'
                            handleClick={this.props.hideLightBox} />
                    <Button text='OK'
                            handleClick={this.insertLink} />
                </div>

            </LightBox>
        )
    }
}

export {
    LinkLightBox
};
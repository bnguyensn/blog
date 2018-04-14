'use strict';

import React, {PureComponent} from 'react';
import 'babel-polyfill';  // Needed for async functions to work

import {post} from "../../js/xhr";

import './css/authentication.css';

const SIGNUP_URL = '/api/signup';
const LOGIN_URL = '/api/login';

class SignUpForm extends PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);
        this.state = {
            username: '',
            pwd: '',
        };
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    async submitSignUp() {
        try {
            await post(SIGNUP_URL, `username=${this.state.username}&pwd=${this.state.pwd}`);

            this.props.setStatusText('User successfully created.');
        }
        catch (e) {
            this.props.setStatusText(`Unable to created user: ${e.message}`);
        }
    }

    render() {
        return (
            <div className='auth-form-container'>
                <label className='auth-form-label'>
                    <span>Username</span>
                    <input name='username' type='text'
                           value={this.state.username}
                           onChange={this.handleInputChange} />
                </label>
                <label className='auth-form-label'>
                    <span>Password</span>
                    <input name='pwd' type='password'
                           value={this.state.pwd}
                           onChange={this.handleInputChange} />
                </label>
                <div className='auth-form-submit-btn' onClick={this.submitSignUp}>SIGN UP</div>
            </div>
        )
    }
}

class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.state = {
            username: '',
            pwd: '',
        };
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    /**
     * This is used only when the cookie token does not exist / is invalid
     * The login form (and to a larger extent, this whole <Authentication /> compoent
     * should not appear if the cookie token exists and is valid
     * */
    async submitLogin() {
        try {
            await post(LOGIN_URL, `username=${this.state.username}&pwd=${this.state.pwd}`);

            // If successful, the above will send back a login token within a cookie.
            // This cookie is then used for future logins to skip this manual login step
            // until the user signs out, or the cookie is cleared.

            // Show user's dashboard on successful login
            window.location.replace("/dashboard");
        }
        catch (e) {
            this.props.setStatusText(`Unable to login: ${e.message}`);
        }
    }

    render() {
        return (
            <div className='auth-form-container'>
                <label className='auth-form-label'>
                    <span>Username</span>
                    <input name='username' type='text'
                           value={this.state.username}
                           onChange={this.handleInputChange} />
                </label>
                <label className='auth-form-label'>
                    <span>Password</span>
                    <input name='pwd' type='password'
                           value={this.state.pwd}
                           onChange={this.handleInputChange} />
                </label>
                <div className='auth-form-submit-btn' onClick={this.submitLogin}>LOGIN</div>
            </div>
        )
    }
}

function AuthFormSelectionBtn(props) {
    function switchAuthForm() {
        props.switchAuthForm(props.name);
    }

    return (
        <div className={`auth-sel-btn ${props.active ? 'active' : 'inactive'}`} onClick={switchAuthForm}>
            {props.label}
        </div>
    )
}

/**
 * This top-level component handles switching between <LoginForm/> and <SignUpForm/>
 * The switch is managed via state.authForm
 * */
class Authentication extends PureComponent {
    constructor(props) {
        super(props);
        this.switchAuthForm = this.switchAuthForm.bind(this);
        this.setStatusText = this.setStatusText.bind(this);
        this.authFormIndex = {
            login: <LoginForm setStatusText={this.setStatusText} />,
            signup: <SignUpForm setStatusText={this.setStatusText} />
        };
        this.state = {
            authForm: 'login',
            statusText: ''
        };
    }

    switchAuthForm(authForm) {
        this.setState({
            authForm: authForm
        });
    }

    setStatusText(text) {
        this.setState({
            statusText: text
        });
    }

    render() {
        return (
            <div id='auth-page'>
                <div className='auth-ctl-container'>
                    <div className='auth-sel-container'>
                        <AuthFormSelectionBtn name='login'
                                              label='LOGIN'
                                              active={this.state.authForm === 'login'}
                                              switchAuthForm={this.switchAuthForm} />
                        <AuthFormSelectionBtn name='signup'
                                              label='SIGN UP'
                                              active={this.state.authForm === 'signup'}
                                              switchAuthForm={this.switchAuthForm} />
                    </div>
                    {this.authFormIndex[this.state.authForm]}
                    <div className='auth-status-txt'>
                        {this.state.statusText}
                    </div>
                </div>
            </div>
        )
    }
}

export default Authentication
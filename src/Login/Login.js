import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import Footer from './../Footer/Footer';
import config from '../config'
import './Login.css';
import TokenService from './../services/TokenServices';
import ApiContext from '../ApiContext';

class Login extends Component {

    state = {
        error: ''
    }

    static contextType = ApiContext;

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    handleLoginSubmit = ev => {
        ev.preventDefault()
        const { login_username, login_password } = ev.target
        const loginAttempt = {
            username: login_username.value,
            password: login_password.value,
        }
        fetch(`${config.API_ENDPOINT}/login`, {
            method: 'POST',
            body: JSON.stringify(loginAttempt),
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(confirmedUser => {
            TokenService.saveAuthToken(confirmedUser.authToken)
            this.props.history.push('/meals')
            this.context.everyMeal()
        })
        .catch( e => {
            this.setState({
                error: e
            })
        })
    }

    render() { 
        return ( 
            <>
            <Nav></Nav> 
            <div className="signup">
                <h2 className="Login_Header">Login</h2>
                <form className="login_form" onSubmit={this.handleLoginSubmit}>
                            <div className="login_username_div">
                                <label className="login_username_class" htmlFor='login_username'>Username:</label>
                                <input type='text' name='login_username' id='login_username' required></input>
                            </div>
                            <div className="login_password_div">
                                <label className="login_password_class" htmlFor='login_password'>Password:</label>
                                <input type='password' name='login_password' id='login_password' required></input>
                            </div>
                            <div className="login_buttons">
                                <button className="login_cancel_button" type="button" onClick={this.handleClickCancel}>Cancel</button>
                                <button className="login_submit_button" type="submit">Log in</button>
                            </div>

                        </form>

                        {this.state.error !== '' 
                        ? <div className="error_message">Error: {JSON.stringify(this.state.error).slice(10).slice(0, -2)}. Please try again.</div>
                        : ''}
            </div>
            <Footer></Footer>
            </>
         );
    }
}
 
export default Login;
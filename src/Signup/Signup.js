import React, { Component } from 'react';
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import config from '../config'
import './Signup.css'


class Signup extends Component {
    state = {
        error: ''
    }

    //If user clicks on cancel button, re-direct to the landing page
    handleClickCancel = () => {
        this.props.history.push('/')
    }

    //POST fetch API used to add user to database if they fill in form details
    handleRegisterSubmit = ev => {
        ev.preventDefault()
        const { first_name, last_name, email, username, password } = ev.target
        const newUser = {
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            username: username.value,
            password: password.value
        }
            fetch(`${config.API_ENDPOINT}/users`, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'content-type': 'application/json'
                  },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(user => {
                this.props.history.push('/login')
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
                <h2 className="Signup_Header">Register Here</h2>
                <form className="Signup_form" onSubmit={this.handleRegisterSubmit}>
                    <div className="first_name_div">
                        <label className="first_name_class" htmlFor='first_name'>First Name:</label>
                        <input type='text' name='first_name' id='first_name' required></input>
                    </div>
                    <div className="last_name_div">
                        <label className="last_name_class" htmlFor='last_name'>Last Name:</label>
                        <input type='text' name='last_name' id='last_name' required></input>
                    </div>
                    <div className="email_div">
                        <label className="email_class" htmlFor='email'>Email:</label>
                        <input type='text' name='email' id='email' required></input>
                    </div>
                    <div className="username_div">
                        <label className="username_class" htmlFor='username'>Username:</label>
                        <input type='text' name='username' id='username' required></input>
                    </div>
                    <div className="password_div">
                        <label className="password_class" htmlFor='password'>Password:</label>
                        <input type='password' name='password' id='password' required></input>
                    </div>
                    <div className="CreateUser_buttons">
                        <button className="CreateUser_cancel_button" type="button" onClick={this.handleClickCancel}>Cancel</button>
                        <button className="CreateUser_submit_button" type="submit">Submit</button>
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
 
export default Signup;
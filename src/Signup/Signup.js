import React, { Component } from 'react';
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import config from '../config'
import './Signup.css'

class Signup extends Component {

    handleClickCancel = () => {
        this.props.history.push('/meals')
    }

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
                        <input type='text' name='first_name' id='first_name' placeholder='John' required></input>
                    </div>
                    <div className="last_name_div">
                        <label className="last_name_class" htmlFor='last_name'>Last Name:</label>
                        <input type='text' name='last_name' id='last_name' placeholder='Smith' required></input>
                    </div>
                    <div className="email_div">
                        <label className="email_class" htmlFor='email'>Email:</label>
                        <input type='text' name='email' id='email' placeholder='JohnSmith@gmail.com' required></input>
                    </div>
                    <div className="username_div">
                        <label className="username_class" htmlFor='username'>Username:</label>
                        <input type='text' name='username' id='username' placeholder='FoodJunkie' required></input>
                    </div>
                    <div className="password_div">
                        <label className="password_class" htmlFor='password'>Password:</label>
                        <input type='text' name='password' id='password' placeholder='CaseSensitive123@!' required></input>
                    </div>
                    <div className="CreateUser_buttons">
                        <button className="CreateUser_cancel_button" type="button" onSubmit={this.handleClickCancel}>Cancel</button>
                        <button className="CreateUser_submit_button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <Footer></Footer>
            </>
         );
    }
}
 
export default Signup;
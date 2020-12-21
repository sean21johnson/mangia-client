import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import Footer from './../Footer/Footer';
import './Login.css';

class Login extends Component {

    handleClickCancel = () => {
        this.props.history.push('/meals')
    }

    render() { 
        return ( 
            <>
            <Nav></Nav> 
            <div className="signup">
                <h2 className="Login_Header">Login Here</h2>
                <form className="login_form">
                            <div className="login_username_div">
                                <label className="login_username_class" htmlFor='login_username'>Username:</label>
                                <input type='text' name='login_username' id='login_username' placeholder='FoodJunkie' required></input>
                            </div>
                            <div className="login_password_div">
                                <label className="login_password_class" htmlFor='login_password'>Password:</label>
                                <input type='text' name='login_password' id='login_password' placeholder='CaseSensitive123@!' required></input>
                            </div>
                            <div className="login_buttons">
                                <button className="login_cancel_button" type="button" onClick={this.handleClickCancel}>Cancel</button>
                                <button className="login_submit_button" type="submit">Log in</button>
                            </div>
                        </form>
            </div>
            <Footer></Footer>
            </>
         );
    }
}
 
export default Login;
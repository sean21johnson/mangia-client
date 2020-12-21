import React, { Component } from 'react';
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import EditMeal from './../EditMeal/EditMeal';
import './Signup.css'

class Signup extends Component {

    handleClickCancel = () => {
        console.log('cancel clicked')
        this.props.history.push('/meals')
    }

    render() { 
        return (
            <>
            <Nav></Nav> 
            <div className="signup">
                <h2 className="Signup_Header">Register Here</h2>
                <form className="Signup_form">
                            <div className="first_name_div">
                                <label className="first_name_class" htmlFor='first_name'>First Name:</label>
                                <input type='text' name="first_name" id='first_name' placeholder='John' required></input>
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
                                <button className="CreateUser_cancel_button" type="button" onClick={this.handleClickCancel}>Cancel</button>
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
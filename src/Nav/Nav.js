import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Nav.css';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import TokenService from './../services/TokenServices';


class Nav extends Component {

    static contextType = ApiContext;

    handleMangiaClick = () => {
        this.context.everyMeal()
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    renderLoginLink() {
        return (
            <header className="header">
                <nav className="nav_bar">
                    <div className="nav_logo">
                    <Link to="/meals" onClick={this.handleMangiaClick} className="mangia_home_link"><FontAwesomeIcon icon={faUtensils}/> Mangia</Link>
                    </div>
                    <div className="nav_logins">
                        <Link to='/'><button className="about_button">About</button></Link>
                        <Link to='/login'><button className="login_button">Log in</button></Link>
                        <Link to='/signup'><button className="join_button">Sign up</button></Link>
                    </div>
                </nav>
            </header>
        )
    }

    renderLogoutLink() {
        return (
            <header className="header">
                <nav className="nav_bar">
                    <div className="nav_logo">
                        <Link to="/meals" onClick={this.handleMangiaClick} className="mangia_home_link"><FontAwesomeIcon icon={faUtensils}/> Mangia</Link>
                    </div>
                    <div className="nav_logins">
                        <Link to='/'><button className="about_button">About</button></Link>
                        <Link to='/'><button className="logout_button" onClick={this.handleLogoutClick}>Logout</button></Link>
                    </div>
                </nav>
            </header>
        )
    }

    render() { 
        return (
            <>
            {TokenService.hasAuthToken()
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
            </> 
         );
    }
}
 
export default Nav;
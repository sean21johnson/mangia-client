import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom'
import './LandingPage.css'
import Footer from './../Footer/Footer';


class LandingPage extends Component {

    render() { 
        return ( 
            <>
            <Nav></Nav>
                <div className="LandingPage">
                    <h1>Mangia!</h1>
                    <div className="LandingPageSections"></div>
                        <section className="mangia_description">
                            <h2 className="Helper_Header">How We Can Help You</h2>
                            <p className="Helper_paragraphs">
                                Mangia is here to help you store memories of your favorite meals. Users add a picture, name, description and meal category for each of these delectable memories. 
                                Login at any time to scroll through the pictures in your meal collection and nostalgically tingle your taste buds. 
                            </p>
                            <p className="Helper_paragraphs">
                                If you have a specific memory in mind, utilize the Mangia search bar to quickly find the meal you are looking for. Or utilize the Mangia filtering tool to hone
                                in on all the memories within a given meal category. Click on the picture of any memory to display additional meal details; update the meal details or delete the 
                                memory from your collection at any time.
                            </p>
                        </section>
                        <section className="mangia_starting">
                            <h2 className="GettingStarted_Header">Getting Started</h2>
                            <ol className="GettingStarted_List">
                                <li><Link to='/signup'>Sign up</Link> for a Mangia Account.</li>
                                <li><a href='https://imgur.com/register?redirect=https%3A%2F%2Fimgur.com%2F' target="_blank" rel="noreferrer">Sign up</a> for an Imgur account.</li>
                                <li><Link to='/signup'>Instructions</Link> to create image URL.</li>
                                <li><Link to='/add-meal'>Add</Link> your first meal.</li>
                            </ol>
                        </section>   
                </div>
            <Footer></Footer>
            </>
         );
    }
}
 
export default LandingPage;
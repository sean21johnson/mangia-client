import React, { Component } from 'react';
import Footer from './../Footer/Footer';
import Nav from './../Nav/Nav'
import './Instructions.css'

class Instructions extends Component {

    render() { 
        return (
            <>
            <Nav></Nav>
            <div className="Instructions">
                <h3 className="Instructions_Header">Instructions for using <a href="https://www.imgur.com" target="_blank" rel="noreferrer">Imgur</a></h3>

                <div className="Instruction-Steps"></div>
                <p className="Instructions_opening">For the best user experience on Mangia, please use Imgur through your Desktop rather than the Imgur mobile application when creating images. If you would like
                    to try creating the images through the Imgur mobile application, please <a href="mailto:seanjohnson220@gmail.com">Email</a> me for additional instructions. Eventually, Mangia will make the process
                    of creating images much easier for our users.
                </p>
                    <section className="Instructions-Signup">
                        <ol className="Instructions_List">
                            <li>Go to <a href="https://www.imgur.com" target="_blank" rel="noreferrer">Imgur</a> and 'Sign in' or 'Sign up' at the top right of the navigation bar.</li>
                            <img className="image-signup" src="https://imgur.com/9tm4RqC.jpg" alt="Signup or Login"></img>
                            <li>Once you are signed in, click on '+ New post' at the top left of the navigation bar.</li>
                            <img className="image-newpost" src="https://i.imgur.com/ePTjmNc.jpg" alt="How to make a new post"></img>
                            <li>Drag and drop a saved image in the dotted box where it says 'Drop images here' or select 'Choose Photo/Video' to find and upload the image from
                                your hard drive.
                            <img className="image-new" src="https://i.imgur.com/AnRvS27.jpg" alt="where to put the file"></img>
                            <li>After the image has been dropped or uploaded, hover mouse over the image and select 'Copy Link' on the top right.</li>
                            <img className="image-copylink" src="https://imgur.com/VifgH9X.jpg" alt="where to copy the link"></img>
                            </li>
                            <li>Copy the link provided and add '.jpg' to the end of the URL when entering the URL field on the 'Create New Meal' form.</li>
                        </ol>
                        <p>*Imgur not required if you already have URLs for your pictures</p>
                    </section>
            </div>
            <Footer></Footer>
            </>
         );
    }
}
 
export default Instructions;
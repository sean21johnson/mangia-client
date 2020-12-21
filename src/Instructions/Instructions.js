import React, { Component } from 'react';
import Footer from './../Footer/Footer';
import Nav from './../Nav/Nav'

class Instructions extends Component {

    render() { 
        return (
            <>
            <Nav></Nav>
            <div className="Instructions">

                <h3>*Remember that Imgur is not necessary if you already have valid URL links for your '.jpg' images.  Please see example of a valid '.jpg' URL link <a href="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" target="_blank" rel="noreferrer">here</a>.*</h3>
                <h3>Instructions for using <a href="https://www.imgur.com" target="_blank" rel="noreferrer">Imgur</a></h3>
                <div className="Instruction-Steps"></div>
                <p>For the best user experience on Mangia, please use Imgur.com through a Desktop rather than the mobile application when creating images. If you would like
                    to try creating the images through the Imgur mobile application, please <a href="mailto:seanjohnson220@gmail.com">Email</a> me for additional instructions.
                </p>
                    <section className="Instructions-Signup">
                        <ol>
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
                        <li>Copy the link provided and add '.jpg' to the end of the URL address when entering the URL address on the 'Create New Meal' form.</li>
                        </ol>
                    </section>
            </div>
            <Footer></Footer>
            </>
         );
    }
}
 
export default Instructions;
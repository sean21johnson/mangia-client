import React, { Component } from 'react';
import config from '../config'
import ApiContext from '../ApiContext'
import { Route, Link } from 'react-router-dom'
import './CreateNewMeal.css'
import { contextType } from 'react-fontawesome';
import Footer from './../Footer/Footer';
import Nav from './../Nav/Nav';

class CreateNewMeal extends Component {
    //need to determine if this defaultProps value is necessary and ever used
    static defaultProps = { 
        history: {
            push: () => {}
        }
    }

    //set a static contextType assigned to the value of ApiContext so we have access to the "context" object which contains this.state.meals and event handler methods
    static contextType = ApiContext;

    //event handler which waits for a user to enter the meal details and click submit on the form
    //first deconstructs 'e.target' and then assigns the values that were inputted to a new meal object with the necessary properties
    //Need to ensure that the properties align with that the server expects on the 'POST' fetch method
    //Ultimately we take the new meal object and pass it into the context provider method 'addMeal' which should update the state. Also will push us back '/'
    //We may want to update where it pushes us back to because the landing page 
    handleSubmit = e => {
        e.preventDefault()
        const { meal_name, meal_image, meal_description, meal_category } = e.target
        const newMeal = {
            meal_name: meal_name.value,
            meal_image: meal_image.value,
            meal_description: meal_description.value,
            meal_category: meal_category.value
        }
        fetch(`${config.API_ENDPOINT}/meals`, {
            method: 'POST',
            body: JSON.stringify(newMeal),
            headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(newMeal)
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(meal => {
            console.log(meal)
            this.context.addMeal(meal)
            this.props.history.push('/meals')
        })
    }

    //should work once routes are setup
    handleClickCancel = () => {
        this.props.history.push('/meals')
    }

    //render a form for the user to create a new meal and when they hit submit, the handle submit method will be called
    render() { 
        return ( 
            <>
                <Nav></Nav>
                    <section className="CreateNewMeal">
                        <h2 className="CreateNewMeal_header">Add New Meal</h2>
                        <form className="CreateNewMeal_form" onSubmit={this.handleSubmit}>
                            <div className="meal_name_div">
                                <label className="meal_name_class" htmlFor='meal_name'>Meal Name</label>
                                <input type='text' name="meal_name" id='meal_name' placeholder='Buffalo Wings' required></input>
                            </div>
                            <div className="meal_image_div">
                                <label className="meal_image_class" htmlFor='meal_image'>Meal Image URL</label>
                                <input type='text' name='meal_image' id='meal_image' placeholder='https://imgur.com/jq0R9ix.jpg' required></input>
                            </div>
                            <div className="meal_category_div">
                                <label className="meal_category_class" htmlFor='meal_category'>Meal Category</label>
                                <select className="category_dropdown" name="meal_category" required>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="Snack">Snack</option>
                                </select> 
                            </div>
                            <div className="meal_description_div">
                                <label className="meal_description_class" htmlFor='meal_description'>Meal Description</label>
                                <input className="meal_textarea_class" type='textarea' name='meal_description' id='meal_description' placeholder='The best wings I ever had from a pub in NYC. 
                                Delicious chicken wings tossed in world famous BBQ sauce with a side of blue cheese dressing. Next time I am in the East Village
                                you will know where to find me!' required></input>
                            </div>

                            <div className="CreateNewMeal_buttons">
                                <button className="create_cancel_button" type="button" onClick={this.handleClickCancel}>Cancel</button>
                                <button className="create_submit_button" type="submit">Save</button>
                            </div>
                        </form>
                        <p><Link to='/instructions'>Instructions</Link> to create URL links for meal images</p>
                    </section>
                <Footer></Footer>
            </>
         );
    }
}
 
export default CreateNewMeal;
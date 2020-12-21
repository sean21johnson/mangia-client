import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from './../config';

//need to figure out how to get to this edit meal page when the user clicks on edit meal
//will need to pass the meal as a prop to this component from the 'MealList' component so we know which meal to edit
class EditMeal extends Component {

    static contextType = ApiContext;

    handleClickCancelEdit = e => {
        console.log('cancel clicked')
        e.preventDefault()

    }

    handleEditSubmit = e => {
        e.preventDefault()
        //need to pass down the mealId from the parent 'MealList' component when the user clicks on edit
        // const { mealId } = this.props.id
        const { edit_meal_name, edit_meal_image, edit_meal_description, edit_meal_category} = e.target
        const editMeal = {
            //will need to add the meal id via the props passed down
            //the 'meal_time' should update automatically when passed down via the PATCH method to whatever the current date/time is
            meal_id: 1,
            meal_name: edit_meal_name.value,
            meal_image: edit_meal_image.value,
            meal_description: edit_meal_description.value,
            meal_category: edit_meal_category.value
        }
        fetch(`${config.API_ENDPOINT}/meals/${editMeal.meal_id}`, {
            method: 'PATCH',
            body: JSON.stringify(editMeal),
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editMeal)
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        //getting an error message 'unexpected end of JSON input' but cannot determine what the issues is
        .then(meal => {
            this.context.updateMeal()
            //will need to add the history.push once routers are setup
            // this.props.history.push('/meals')
        })
    }

    // handleSubmit = e => {
    //     e.preventDefault()
    //     const { meal_name, meal_image, meal_description, meal_category } = e.target
    //     const newMeal = {
    //         meal_name: meal_name.value,
    //         meal_image: meal_image.value,
    //         meal_description: meal_description.value,
    //         meal_category: meal_category.value
    //     }
    //     fetch(`${config.API_ENDPOINT}/meals`, {
    //         method: 'POST',
    //         body: JSON.stringify(newMeal),
    //         headers: {
    //             'content-type': 'application/json'
    //           },
    //           body: JSON.stringify(newMeal)
    //     })
    //     .then(res => {
    //         if (!res.ok)
    //             return res.json().then(e => Promise.reject(e))
    //         return res.json()
    //     })
    //     .then(meal => {
    //         console.log(meal)
    //         this.context.addMeal(meal)
    //         this.props.history.push('/')
    //     })
    // }

    render() { 
        return ( 
            <div className="EditMeal">
                <h2>Edit Meal</h2>
                <form className="EditMeal_form" onSubmit={this.handleEditSubmit}>
                    <div>
                        <label htmlFor='edit_meal_name'>Meal Name</label>
                        <input type='text' name="edit_meal_name" id='edit_meal_name' placeholder='the current meal name'></input>
                    </div>
                    <div>
                        <label htmlFor='edit_meal_image'>Meal Image URL</label>
                        <input type='text' name='edit_meal_image' id='edit_meal_image' placeholder='https://imgur.com/jq0R9ix.jpg'></input>
                    </div>
                    <div>
                        <label htmlFor='edit_meal_description'>Description</label>
                        <input type='text' name='edit_meal_description' id='edit_meal_description' placeholder='The best wings I ever had from a pub in NYC'></input>
                    </div>
                    <div>
                        <label htmlFor='edit_meal_category'>Category</label>
                        <select className="edit_category_dropdown" name="edit_meal_category">
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Snack">Snack</option>
                        </select> 
                    </div>
                    <div className="EditMeal_buttons">
                        <button type="button" onClick={this.handleClickCancelEdit}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>

            </div>
            
         );
    }
}
 
export default EditMeal;
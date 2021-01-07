import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from './../config';
import './EditMeal.css'

class EditMeal extends Component {

    static contextType = ApiContext;

    //User fills in the form to edit a meal and passes to the handleEditSubmit method which in turn uses a GET fetch API to PATCH details of an existing meal in the database
    handleEditSubmit = e => {
        e.preventDefault()
        const { edit_meal_name, edit_meal_image, edit_meal_description, edit_meal_category } = e.target
        const editMeal = {
            meal_id: this.props.id,
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
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(meal => {
            this.context.updateMeal()
        })
    }

    //If user clicks cancel, the ID of the meal is passed to an event handler to updat the state and collapse the EditMeal expansion on the page
    handleClickCancelEdit = id => {
        this.context.updateMealId(id)
    }

    render() { 
        return ( 
            <div className="EditMeal">
                <form className="EditMeal_form" onSubmit={this.handleEditSubmit}>
                    <div className="edit_meal_section">
                        <label htmlFor='edit_meal_name'></label>
                        <input className='edit_meal_class' type='text' name="edit_meal_name" id='edit_meal_name' placeholder={this.props.name} required></input>
                    </div>
                    <div className="edit_image_section">
                        <label htmlFor='edit_meal_image'></label>
                        <input className='edit_image_class' type='text' name='edit_meal_image' id='edit_meal_image' placeholder={this.props.url} required></input>
                    </div>
                    <div className="edit_category_section">
                        <label htmlFor='edit_meal_category'></label>
                        <select className="edit_category_class" name="edit_meal_category" required>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Snack">Snack</option>
                        </select> 
                    </div>
                    <div className="edit_description_section">
                        <label htmlFor='edit_meal_description'></label>
                        <textarea className='edit_description_class' type='text' name='edit_meal_description' id='edit_meal_description' placeholder={this.props.description} required></textarea>
                    </div>

                    <div className="EditMeal_buttons">
                        <button className="edit_delete_button" type="button" onClick={this.handleClickCancelEdit}>Cancel</button>
                        <button className="edit_save_button" type="submit">Save</button>
                    </div>
                </form>

            </div>
            
         );
    }
}
 
export default EditMeal;
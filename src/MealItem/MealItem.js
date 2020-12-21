import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import './MealItem.css'
import config from './../config';
import EditMeal from './../EditMeal/EditMeal';

class MealItem extends Component {
    static defaultProps = {
        onDeleteMeal: () => {}
    }

    static contextType = ApiContext;

    handleClickDelete = e => {
        e.preventDefault()
        const mealId = this.props.id

        fetch(`${config.API_ENDPOINT}/meals/${mealId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok)
                return res.json.then(e => Promise.reject(e))
        })
        .then(() => {
            this.context.deleteMeal(mealId)
            this.props.onDeleteMeal()
        })
    }

    handleClickEdit = e => {
        console.log('edit clicked')
        const mealId = this.props.id
        console.log(mealId)
    }

    handleUpdateStateIndex = e => {
        if (this.context.indexOfMeal !== this.props.index) {
            this.context.indexOfMeal = this.props.index
            this.context.updateIndex(this.context.indexOfMeal)
        }
        else {
            this.context.updateIndex(null)
        }
    }

    render() { 
        return ( 
            <li className="MealItem">
                <div className="showing_section">
                    <img className="meal_picture_image" src={this.props.meal_image} alt="meal pic" onClick={this.handleUpdateStateIndex}></img>
                    <h6 className="meal_picture_name">{this.props.meal_name}</h6>
                </div>


                    {this.props.index === this.context.indexOfMeal && 
                    
                    <div className="additional_details">
                        <p>{this.props.meal_time}</p>   
                        <p>{this.props.meal_category}</p>
                        <p>{this.props.meal_description}</p>
                        <button className="Meal_delete" type="button" onClick={this.handleClickDelete}>Delete</button>
                        <button className="Meal_edit" type="button" onClick={this.handleClickEdit}>Edit</button>
                    </div>}

                    <br/>                    
            </li>
         );
    }
}
 
export default MealItem;
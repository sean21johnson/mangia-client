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
        if (this.context.idOfMeal !== this.props.id) {
            this.context.idOfMeal = this.props.id
            this.context.updateMealId(this.context.idOfMeal)
        }
        this.context.updateMealId(this.props.id)

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

        let mealString = this.props.meal_time.substring(0, 10)
        let year = mealString.substring(0, 4)
        let month = mealString.substring(5,7)
        let day = mealString.substring(8,10)
        mealString = `${month}-${day}-${year}`

        return ( 
            <div className="meal_container_item">
                <li className="MealItem">
                    <div className="showing_section">
                        <img className="meal_picture_image" src={this.props.meal_image} alt="meal pic" onClick={this.handleUpdateStateIndex}></img>
                        <h6 className="meal_picture_name">{this.props.meal_name}</h6>
                    </div>


                        {this.props.index === this.context.indexOfMeal && 
                        
                        <div className="additional_details">
                            <p className="meal_paragraph_details">{this.props.meal_category}: {mealString}</p> 
                            <p className="meal_description_details">{this.props.meal_description}</p>
                            <div className="meal_buttons">
                                <button className="Meal_delete" type="button" onClick={this.handleClickDelete}>Delete</button>
                                <button className="Meal_edit" type="button" onClick={this.handleClickEdit}>Edit</button>
                            </div>
                        </div>}


                        {this.props.id === this.context.idOfMeal &&

                        <div>
                        <EditMeal id={this.props.id} name={this.props.meal_name} description={this.props.meal_description} url={this.props.meal_image} category={this.props.meal_category}></EditMeal>
                        </div>}                   
                </li>
            </div>
         );
    }
}
 
export default MealItem;
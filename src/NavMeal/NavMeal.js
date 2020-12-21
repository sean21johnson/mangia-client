import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import './NavMeal.css'

class NavMeal extends Component {

    static contextType = ApiContext;

    //add event handler so that if they select 'all meals' it will redirect to the getAllMeals event handler in the app component and re-render all meals
    handleCategoryChoice = (e) => {
        e.preventDefault()
        this.context.categoryFilter(e.target.value)
    }

    handleSearchChoice = (e) => {
        e.preventDefault()
        if (e.key === 'Enter')
            this.context.searchFilter(e.target.value)
    }

    render() { 
        return ( 
            <div className="NavMeal">
                <input className ="Search_Meal" type="text" onKeyUp={this.handleSearchChoice} placeholder="Search for Meal"/>
                <Link to='/add-meal' className="Create_Meal">Add Meal</Link>
                <select onChange={this.handleCategoryChoice} className="category_dropdown">
                    <option disabled>Meal Type</option>
                    <option value="All Meals">All Meals</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Snack">Snack</option>
                </select>
            </div>
         );
    }
}
 
export default NavMeal;
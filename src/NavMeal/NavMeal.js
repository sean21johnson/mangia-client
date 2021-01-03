import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import './NavMeal.css'

class NavMeal extends Component {

    static contextType = ApiContext;

    handleCategoryChoice = (e) => {
        this.context.categoryFilter(e.target.value)
    }

    handleSearchChoice = (e) => {
        if (e.key === 'Enter')
            this.context.searchFilter(e.target.value)
    }

    handleSearchChange = (e) => {
        this.context.searchChange(e.target.value)
    }

    render() { 
        return (
            <div className="NavMeal">
                <input className ="Search_Meal" type="text" value={this.context.searchText} onChange={this.handleSearchChange} onKeyUp={this.handleSearchChoice} placeholder="Search for Meal"/>
                <Link to='/add-meal' className="Create_Meal">Add Meal</Link>
                <select onChange={this.handleCategoryChoice} value={this.context.dropdownText} className="category_dropdown">
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
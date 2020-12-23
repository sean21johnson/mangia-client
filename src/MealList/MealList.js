import React, { Component } from 'react';
import MealItem from '../MealItem/MealItem';
import ApiContext from '../ApiContext'
import Footer from './../Footer/Footer';
import Nav from './../Nav/Nav';
import NavMeal from './../NavMeal/NavMeal';
import "./MealList.css"

class MealList extends Component {
    //need to determine if the defaultProps here are necessary/doing anything
    static defaultProps = {
        match: {
            params: {}
        }
    }

    //now have access to the context which contains this.state.meals and 3 event handler methods
    static contextType = ApiContext

    //need to onclude the push once my route links are working
    handleDeleteMeal = () => {
        // this.props.history.push('/')
    }

    //currently, we take the meals array from this.context
    //We then map each meal in the meals array to the MealItem component. 
    render() { 
        const { meals } = this.context
        // const meal = findMeal(meals, mealId) || { description: '' }

        return ( 
            <>
                <Nav></Nav>
                <NavMeal></NavMeal>
                    <section className="MealsList">
                        {/* <h2>Meal Collection</h2> */}
                        <ul className="MealsList_list">
                            {meals.map((meal, index) => 
                                <MealItem
                                    index={index}
                                    key={meal.meal_id}
                                    id={meal.meal_id}
                                    onDeleteMeal={this.handleDeleteMeal}
                                    {...meal}
                                />
                                )}
                        </ul>
                    </section>
                <Footer></Footer>
            </>        
         );
    }
}
 
export default MealList;
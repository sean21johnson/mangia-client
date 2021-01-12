import React, { Component } from "react";
import MealItem from "../MealItem/MealItem";
import ApiContext from "../ApiContext";
import Footer from "./../Footer/Footer";
import Nav from "./../Nav/Nav";
import NavMeal from "./../NavMeal/NavMeal";
import "./MealList.css";

class MealList extends Component {
	static defaultProps = {
		match: {
			params: {},
		},
	};

	static contextType = ApiContext;

	render() {
		const { meals } = this.context;

		return (
			<>
				<Nav></Nav>
				<NavMeal></NavMeal>
				<section className="MealsList">
					<ul className="MealsList_list">
						<h3 className="meal_collection_header">Meal Collection</h3>
						<div className="meals_container">
							{meals.map((meal, index) => (
								<MealItem
									index={index}
									key={meal.meal_id}
									id={meal.meal_id}
									onDeleteMeal={this.handleDeleteMeal}
									{...meal}
								/>
							))}
						</div>
					</ul>
				</section>
				<Footer></Footer>
			</>
		);
	}
}

export default MealList;

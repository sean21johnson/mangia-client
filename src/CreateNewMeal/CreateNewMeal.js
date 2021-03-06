import React, { Component } from "react";
import config from "../config";
import { Link } from "react-router-dom";
import "./CreateNewMeal.css";
import Footer from "./../Footer/Footer";
import Nav from "./../Nav/Nav";
import TokenService from "./../services/TokenServices";
import ApiContext from "../ApiContext";

class CreateNewMeal extends Component {
	static contextType = ApiContext;

	static defaultProps = {
		history: {
			push: () => {},
		},
	};

	//User fills in the form for a new meal and passes to the handleSubmit method which in turn uses a GET fetch API to POST a new meal in the database
	handleSubmit = (e) => {
		e.preventDefault();
		const { meal_name, meal_image, meal_description, meal_category } = e.target;
		const newMeal = {
			meal_name: meal_name.value,
			meal_image: meal_image.value,
			meal_description: meal_description.value,
			meal_category: meal_category.value,
		};
		fetch(`${config.API_ENDPOINT}/meals`, {
			method: "POST",
			body: JSON.stringify(newMeal),
			headers: {
				"content-type": "application/json",
				authorization: `mangia-client-auth-token ${TokenService.getAuthToken()}`,
			},
		})
			.then((res) => {
				if (!res.ok) return res.json().then((e) => Promise.reject(e));
				return res.json();
			})
			.then((meal) => {
				this.context.addMeal(meal);
				this.props.history.push("/meals");
			});
	};

	//If user clicks cancel, re-direct to the MealList
	handleClickCancel = () => {
		this.props.history.push("/meals");
	};

	render() {
		return (
			<>
				<Nav></Nav>
				<section className="CreateNewMeal">
					<h2 className="CreateNewMeal_header">Add New Meal</h2>
					<form className="CreateNewMeal_form" onSubmit={this.handleSubmit}>
						<div className="meal_name_div">
							<label className="meal_name_class" htmlFor="meal_name">
								Meal Name
							</label>
							<input
								type="text"
								name="meal_name"
								id="meal_name"
								placeholder="Buffalo Wings"
								required
							></input>
						</div>
						<div className="meal_image_div">
							<label className="meal_image_class" htmlFor="meal_image">
								*Meal Image URL
							</label>
							<input
								type="text"
								name="meal_image"
								id="meal_image"
								placeholder="https://imgur.com/jq0R9ix.jpg"
								required
							></input>
						</div>
						<div className="meal_category_div">
							<label className="meal_category_class" htmlFor="meal_category">
								Meal Category
							</label>
							<select
								className="create_category_dropdown"
								name="meal_category"
								required
							>
								<option value="Breakfast">Breakfast</option>
								<option value="Lunch">Lunch</option>
								<option value="Dinner">Dinner</option>
								<option value="Dessert">Dessert</option>
								<option value="Snack">Snack</option>
							</select>
						</div>
						<div className="meal_description_div">
							<label
								className="meal_description_class"
								htmlFor="meal_description"
							>
								Meal Description
							</label>
							<textarea
								className="meal_textarea_class"
								type="textarea"
								name="meal_description"
								id="meal_description"
								placeholder="The best wings I ever had from a pub in NYC. Delicious chicken wings tossed in world famous BBQ sauce with a side of blue cheese dressing. Next time I am in the East Village you will know where to find me!"
								required
							></textarea>
						</div>

						<div className="CreateNewMeal_buttons">
							<button
								className="create_cancel_button"
								type="button"
								onClick={this.handleClickCancel}
							>
								Cancel
							</button>
							<button className="create_submit_button" type="submit">
								Save
							</button>
						</div>
					</form>
					<p className="instructions_paragraph">
						*<Link to="/instructions">Instructions</Link> to create URLs for
						meal images
					</p>
				</section>
				<Footer></Footer>
			</>
		);
	}
}

export default CreateNewMeal;

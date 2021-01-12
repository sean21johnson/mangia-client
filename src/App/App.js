import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MealList from "./../MealList/MealList";
import LandingPage from "../LandingPage/LandingPage";
import Instructions from "../Instructions/Instructions";
import CreateNewMeal from "./../CreateNewMeal/CreateNewMeal";
import ApiContext from "../ApiContext";
import Login from "./../Login/Login";
import Signup from "./../Signup/Signup";
import config from "./../config";
import TokenService from "./../services/TokenServices";
import PublicOnlyRoute from "./../Utils/PublicOnlyRoute";
import PrivateRoute from "./../Utils/PrivateRoute";
import "./App.css";

//App Component holds state of Mangia application
class App extends Component {
	state = {
		meals: [],
		indexOfMeal: null,
		idOfMeal: null,
		searchText: "",
		dropdownText: "",
		loggedIn: false,
	};

	//GET fetch API for getting every meal in a users collection from server/database
	getAllMeals = () => {
		Promise.all([
			fetch(`${config.API_ENDPOINT}/meals`, {
				headers: {
					authorization: `mangia-client-auth-token ${TokenService.getAuthToken()}`,
				},
			}),
		])
			.then(([mealsRes]) => {
				if (!mealsRes.ok) return mealsRes.json().then((e) => Promise.reject(e));

				return Promise.all([mealsRes.json()]);
			})
			.then(([meals]) => {
				this.setState({
					meals,
					searchText: "",
					dropdownText: "",
				});
			})
			.catch((error) => {
				console.error({ error });
			});
	};

	//GET fetch API used for getting all user's meals for the category that they select from the 'Meal Category' dropdown (breakfast, lunch, dinner, snack, dessert)
	handleCategoryFilter = (category) => {
		Promise.all([
			fetch(`${config.API_ENDPOINT}/meals?filter=${category}`, {
				headers: {
					authorization: `mangia-client-auth-token ${TokenService.getAuthToken()}`,
				},
			}),
		])
			.then(([mealsRes]) => {
				if (!mealsRes.ok) return mealsRes.json().then((e) => Promise.reject(e));

				return Promise.all([mealsRes.json()]);
			})
			.then(([meals]) => {
				if (category === "All Meals") {
					this.getAllMeals();
				}
				this.setState({
					meals,
					dropdownText: category,
				});
			});
	};

	//GET fetch API used for getting all user's meals where the meal_name contains the search term that the user inputs in the 'Search for Meal' search bar
	handleSearchFilter = (searchTerm) => {
		Promise.all([
			fetch(`${config.API_ENDPOINT}/meals?search=${searchTerm}`, {
				headers: {
					authorization: `mangia-client-auth-token ${TokenService.getAuthToken()}`,
				},
			}),
		])
			.then(([mealsRes]) => {
				if (!mealsRes.ok) return mealsRes.json().then((e) => Promise.reject(e));

				return Promise.all([mealsRes.json()]);
			})
			.then(([meals]) => {
				this.setState({
					meals,
					searchText: searchTerm,
				});
			});
	};

	//componentDidMount calls getAllMeals so that the user first sees all meals in their collection when they login
	componentDidMount() {
		if (TokenService.hasAuthToken()) {
			return this.getAllMeals();
		}
	}

	//If a user adds a meal to their collection, the meals array within state is updated to include the new meal
	handleAddMeal = (meal) => {
		this.setState({
			meals: [...this.state.meals, meal],
		});
	};

	//If a user deletes a meal from their collection, the meals array within state is updated to exclude the new meal
	handleDeleteMeal = (mealId) => {
		this.setState({
			meals: this.state.meals.filter((meal) => meal.meal_id !== mealId),
		});
		this.handleUpdateIndex(null);
		this.getAllMeals();
	};

	//After meal edit has occurred, update the idOfMeal within state back to null so that the EditMeal expansion is no longer reflecting on the page
	handleUpdateMeal = () => {
		this.getAllMeals();
		this.setState({
			idOfMeal: null,
		});
	};

	//If user clicks edit, update the state of the idOfMeal property to be the ID of the meal selected, which will conditionally render that EditMeal component
	handleUpdateMealId = (id) => {
		if (id === this.state.idOfMeal) {
			this.setState({
				idOfMeal: null,
			});
		} else {
			this.setState({
				idOfMeal: id,
			});
		}
	};

	//Update the indexOfMeal property in state to the specific index that the user selected
	handleUpdateIndex = (index) => {
		this.setState({
			indexOfMeal: index,
			idOfMeal: null,
		});
	};

	//Update the searchText property in state to the searchTerm that the user inputs
	handleSearchUpdate = (searchTerm) => {
		this.setState({
			searchText: searchTerm,
		});
	};

	//update the loggedIn property in state to determine if a user is logged in or not
	handleUpdateLoggedInOrOut = () => {
		this.setState({
			loggedIn: true,
		});
	};

	//Method to render components based on the URL path
	renderRoutes() {
		return (
			<>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/instructions" component={Instructions} />
					<PrivateRoute path="/add-meal" component={CreateNewMeal} />
					<PrivateRoute path="/meals" component={MealList} />
					<PublicOnlyRoute path="/login" component={Login} />
					<PublicOnlyRoute path="/signup" component={Signup} />
				</Switch>
			</>
		);
	}

	//Pass the context and event handlers which impact state down to the child components
	render() {
		const value = {
			meals: this.state.meals,
			indexOfMeal: this.state.indexOfMeal,
			idOfMeal: this.state.idOfMeal,
			searchText: this.state.searchText,
			dropdownText: this.state.dropdownText,
			everyMeal: this.getAllMeals,
			addMeal: this.handleAddMeal,
			deleteMeal: this.handleDeleteMeal,
			updateMeal: this.handleUpdateMeal,
			categoryFilter: this.handleCategoryFilter,
			searchFilter: this.handleSearchFilter,
			searchChange: this.handleSearchUpdate,
			categoryChange: this.handleCategoryUpdate,
			updateIndex: this.handleUpdateIndex,
			updateMealId: this.handleUpdateMealId,
			updateLoginStatus: this.handleUpdateLoggedInOrOut,
		};

		return (
			<ApiContext.Provider value={value}>
				<main className="App">{this.renderRoutes()}</main>
			</ApiContext.Provider>
		);
	}
}

export default App;

import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Nav from '../Nav/Nav'
import MealList from './../MealList/MealList';
import config from '../config'
import './App.css'
import NavMeal from './../NavMeal/NavMeal';
import LandingPage from '../LandingPage/LandingPage';
import Footer from './../Footer/Footer';
import Instructions from '../Instructions/Instructions';
import CreateNewMeal from './../CreateNewMeal/CreateNewMeal';
import ApiContext from '../ApiContext'
import MealItem from '../MealItem/MealItem';
import EditMeal from './../EditMeal/EditMeal';
import Login from './../Login/Login';
import Signup from './../Signup/Signup';


class App extends Component {
  state = {
    meals: [],
    indexOfMeal: null,
    filter: null,
    search: null,
  };

  //method to fetch all meals and set the state to be all meals from the database for a given user
  getAllMeals = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/meals`)
    ])
      .then(([mealsRes]) => {
        if (!mealsRes.ok)
          return mealsRes.json().then(e => Promise.reject(e))

        return Promise.all([
          mealsRes.json()
        ])
      })
      .then(([meals]) => {
        this.setState({ meals })
      })
      .catch(error => {
        console.error({ error })
      })
  }


  componentDidMount() {
    this.getAllMeals()
  }


  handleAddMeal = meal => {
    this.setState({
      meals: [
        ...this.state.meals,
        meal
      ]
    })
  }

  handleDeleteMeal = mealId => {
    this.setState({
      meals: this.state.meals.filter(meal => meal.meal_id !== mealId)
    })
    this.handleUpdateIndex(null)
    this.getAllMeals()
  }

  handleUpdateMeal = () => {
    this.getAllMeals()
  }

  handleUpdateIndex = index => {
    this.setState({
      indexOfMeal: index
    })
  }

  //trying to figure out how to filter for 'breakfast' and then for 'lunch' for example, and have it reset state to all meals before trying to get lunch
  handleCategoryFilter = category => {
    if (category === 'All Meals') {
      this.setState({
        filter: category
      })
      return this.getAllMeals()
    }
    else if (category !== this.state.filter) {
      this.setState({
        meals: this.state.meals.filter(meal => meal.meal_category === category),
        indexOfMeal: null,
        filter: category,
    })}
  }

  handleSearchFilter = searchTerm => {
    this.setState({
      meals: this.state.meals.filter(meal => meal.meal_name.toLowerCase().includes(searchTerm.toLowerCase())),
      search: searchTerm
    })
  }

  renderRoutes() {
    return (
      <>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/instructions' component={Instructions}/>
        <Route path='/add-meal' component={CreateNewMeal}/>
        <Route path='/meals' component={MealList}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
      </>
    )
  }


  //We create a value object containing a property for the meals state, and 3 methods to add, remove, or update a meal
  //The value object is given to all children components of App as a context provider
  render() {
    const value = {
      meals: this.state.meals,
      indexOfMeal: this.state.indexOfMeal,
      category: this.state.category,
      everyMeal: this.getAllMeals,
      addMeal: this.handleAddMeal,
      deleteMeal: this.handleDeleteMeal,
      updateMeal: this.handleUpdateMeal,
      updateIndex: this.handleUpdateIndex,
      categoryFilter: this.handleCategoryFilter,
      searchFilter: this.handleSearchFilter,
    }

    return (
      <ApiContext.Provider value={value}>
      <main className = 'App'>
        {this.renderRoutes()}
      </main>
      </ApiContext.Provider>
    )
  }
}


export default App;

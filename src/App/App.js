import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MealList from './../MealList/MealList';
import './App.css'
import LandingPage from '../LandingPage/LandingPage';
import Instructions from '../Instructions/Instructions';
import CreateNewMeal from './../CreateNewMeal/CreateNewMeal';
import ApiContext from '../ApiContext'
import Login from './../Login/Login';
import Signup from './../Signup/Signup';
import config from './../config';


class App extends Component {
  state = {
    meals: [],
    indexOfMeal: null,
    filter: null,
    search: null,
    idOfMeal: null
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

  handleCategoryFilter = category => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/meals?filter=${category}`)
    ])
      .then(([mealsRes]) => {
        if (!mealsRes.ok)
          return mealsRes.json().then(e => Promise.reject(e))

        return Promise.all([
          mealsRes.json()
        ])
      })
      .then(([meals]) => {
        if(category === "All Meals") {
          this.getAllMeals()
        }
        this.setState({ meals })
      })
  }

  handleSearchFilter = searchTerm => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/meals?search=${searchTerm}`)
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
  }

  //on page load we can set the state of the dropdown to the original placeholder
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

  handleUpdateMeal = id => {
    this.getAllMeals()
    this.setState({
      idOfMeal: null
    })
  }

  handleUpdateMealId = id => {
    if (id === this.state.idOfMeal) {
      this.setState({
        idOfMeal: null
      })}
    else {
    this.setState({
      idOfMeal: id
    })}
  }

  handleUpdateIndex = index => {
    this.setState({
      indexOfMeal: index,
      idOfMeal: null
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
      idOfMeal: this.state.idOfMeal,
      everyMeal: this.getAllMeals,
      addMeal: this.handleAddMeal,
      deleteMeal: this.handleDeleteMeal,
      updateMeal: this.handleUpdateMeal,
      updateMealId: this.handleUpdateMealId,
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

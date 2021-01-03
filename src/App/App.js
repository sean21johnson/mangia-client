import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MealList from './../MealList/MealList';
import LandingPage from '../LandingPage/LandingPage';
import Instructions from '../Instructions/Instructions';
import CreateNewMeal from './../CreateNewMeal/CreateNewMeal';
import ApiContext from '../ApiContext';
import Login from './../Login/Login';
import Signup from './../Signup/Signup';
import config from './../config';
import TokenService from './../services/TokenServices';
import PublicOnlyRoute from './../Utils/PublicOnlyRoute';
import PrivateRoute from './../Utils/PrivateRoute';
import './App.css';


class App extends Component {
  state = {
    meals: [],
    indexOfMeal: null,
    idOfMeal: null,
    searchText: "",
    dropdownText: "",
  };

  getAllMeals = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/meals`, {
        headers: {
          'authorization': `mangia-client-auth-token ${TokenService.getAuthToken()}`,
        }
      })
    ])
      .then(([mealsRes]) => {
        if (!mealsRes.ok)
          return mealsRes.json().then(e => Promise.reject(e))

        return Promise.all([
          mealsRes.json()
        ])
      })
      .then(([meals]) => {
        this.setState({ 
          meals,
          searchText: "",
          dropdownText: ""
        })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleCategoryFilter = category => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/meals?filter=${category}`, {
        headers: {
          'authorization': `mangia-client-auth-token ${TokenService.getAuthToken()}`
        }
      })
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
        this.setState({ 
          meals,
          dropdownText: category
        })
      })
  }

  handleSearchFilter = searchTerm => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/meals?search=${searchTerm}`, {
        headers: {
          'authorization': `mangia-client-auth-token ${TokenService.getAuthToken()}`
        }
      })
    ])
      .then(([mealsRes]) => {
        if (!mealsRes.ok)
          return mealsRes.json().then(e => Promise.reject(e))

        return Promise.all([
          mealsRes.json()
        ])
      })
      .then(([meals]) => {
        this.setState({ 
          meals,
          searchText: searchTerm 
        })
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

  handleSearchUpdate = searchTerm => {
    this.setState({
      searchText: searchTerm
    })
  }

  renderRoutes() {
    return (
      <>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/instructions' component={Instructions}/>
          <PrivateRoute path='/add-meal' component={CreateNewMeal}/>
          <PrivateRoute path='/meals' component={MealList}/>
          <PublicOnlyRoute path='/login' component={Login}/>
          <PublicOnlyRoute path='/signup' component={Signup}/>
        </Switch>
      </>
    )
  }

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
      updateMealId: this.handleUpdateMealId,
      updateIndex: this.handleUpdateIndex,
      categoryFilter: this.handleCategoryFilter,
      searchFilter: this.handleSearchFilter,
      searchChange: this.handleSearchUpdate,
      categoryChange: this.handleCategoryUpdate,
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

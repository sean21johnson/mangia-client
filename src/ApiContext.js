import React from 'react'

//Setting a context which contains an empty meals array and two methods for adding a meal and deleting a meal
//Added a method for updating a meal
export default React.createContext({
    meals: [],
    indexOfMeal: null,
    filter: null,
    search: null,
    idOfMeal: null,
    everyMeal: () => {},
    addMeal: () => {},
    deleteMeal: () => {},
    updateMeal: () => {},
    updateIndex: () => {},
    categoryFilter: () => {},
    searchFilter: () => {},
})
export const findMeal = (meals = [], mealId) =>
	meals.find((meal) => meal.meal_id === mealId);

export const getMealsForCategory = (meals = [], mealCategory) =>
	!mealCategory
		? meals
		: meals.filter((meal) => meal.meal_category === mealCategory);

//may need to include a function that generates a random meal

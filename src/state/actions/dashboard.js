import * as actionTypes from './actionTypes';
import axios from 'axios';

const addRecipeSucces = (newRecipe) => {
	return {
		type: actionTypes.ADD_RECIPE,
		newRecipe: newRecipe
	}
}

export const addRecipe = () => {
	const newRecipe = {
		title: 'Без названия',
		guide: '',
		ingredients: []
	}

	return dispatch => {
		axios.post('https://react-recipes-app-596c7.firebaseio.com/recipes.json', newRecipe)
			.then(response => {
				dispatch( addRecipeSucces({...newRecipe, id: response.data.name}) )
			})
			.catch(error => {
				console.log(error)
			})
	}

}

const loadRecipesSucces = data => {
	return {
		type: actionTypes.LOAD_RECIPES_SUCCESS,
		data: data
	}
}

export const loadRecipes = () => {
	return dispatch => {
		axios.get('https://react-recipes-app-596c7.firebaseio.com/recipes.json')
			.then(response => {

				let recipesList = [];
				for(let key in response.data) {
					recipesList.push({
						...response.data[key],
						id: key
					})
				}

				dispatch (loadRecipesSucces (recipesList) )
			})
			.catch(error => {
				console.log(error)
			})
	}
}
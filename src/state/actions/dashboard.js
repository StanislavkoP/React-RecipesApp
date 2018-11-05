import * as actionTypes from './actionTypes';
import axios from 'axios';

const addRecipeLoading = () => {
	return {
		type: actionTypes.ADD_RECIPE_LOADING
	}
}

const addRecipeSucces = (newRecipe) => {
	return {
		type: actionTypes.ADD_RECIPE_SUCCESS,
		newRecipe: newRecipe
	}
}

const addRecipeFailed = () => {
	return {
		type: actionTypes.ADD_RECIPE_FAILED,
	}
}


export const addRecipe = (userId) => {
	const newRecipe = {
		title: 'Без названия',
		guide: '',
		ingredients: []
	}

	return dispatch => {
		dispatch( addRecipeLoading() )

		axios.post(`https://react-recipes-app-596c7.firebaseio.com/recipes/${userId}.json?auth=WRocQv8wYnO9SMcPjJFWqqfnbrEp3h0tTGttOzy9`, newRecipe)
			.then(response => {
				dispatch( addRecipeSucces({...newRecipe, id: response.data.name}) )
			})
			.catch(error => {
				console.log(error)
				dispatch ( addRecipeFailed() )
			})
	}

}

const loadRecipesSucces = data => {
	return {
		type: actionTypes.LOAD_RECIPES_SUCCESS,
		data: data
	}
}

export const loadRecipes = (userId) => {
	return dispatch => {
		axios.get(`https://react-recipes-app-596c7.firebaseio.com/recipes/${userId}.json?auth=WRocQv8wYnO9SMcPjJFWqqfnbrEp3h0tTGttOzy9`)
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
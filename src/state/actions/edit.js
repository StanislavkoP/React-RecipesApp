import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadRecipeSucces = () => {
	return {
		type: actionTypes.LOAD_RECIPE_SUCCESS,
	}
}

export const loadRecipe = (idRecipe) => {

	return dispatch => {
		axios.get(`https://react-recipes-app-596c7.firebaseio.com/recipes/${idRecipe}.json`)
			.then(response => {
				console.log(response)
				/* dispatch (loadRecipeSucces (recipesList) ) */
			})
			.catch(error => {
				console.log(error)
			})
	}
	


}


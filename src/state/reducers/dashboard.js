import * as actionTypes from '../actions/actionTypes';

const initialState = {
	recipes: [],
	isLoaded: false
};

const addRecipe = (state, action) => {
	return {
		...state,
		recipes: state.recipes.concat(action.newRecipe)
	}
};

const loadRecipesSucces = (state, action) => {
	return {
		...state,
		recipes: [...action.data],
		isLoaded: true,
	}
}

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_RECIPE: return addRecipe( state, action );
        case actionTypes.LOAD_RECIPES_SUCCESS: return loadRecipesSucces( state, action );
        default: return state;
    }

}

export default reducer;
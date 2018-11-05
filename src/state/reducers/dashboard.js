import * as actionTypes from '../actions/actionTypes';

const initialState = {
	recipes: [],
	isLoaded: false,
	loading: false,
};

const addRecipeLoading = (state, action) => {
	return {
		...state,
		loading: true
	}
}

const addRecipeSuccess = (state, action) => {
	return {
		...state,
		loading: false,
		recipes: state.recipes.concat(action.newRecipe)
	}
};

const addRecipeFailed = (state, action) => {
	return {
		...state,
		loading: false,
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
        case actionTypes.ADD_RECIPE_LOADING: return addRecipeLoading( state, action );
        case actionTypes.ADD_RECIPE_SUCCESS: return addRecipeSuccess( state, action );
        case actionTypes.ADD_RECIPE_FAILED: return addRecipeFailed( state, action );
        case actionTypes.LOAD_RECIPES_SUCCESS: return loadRecipesSucces( state, action );
        default: return state;
    }

}

export default reducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
	recipes: []
};

const addRecipe = (state, action) => {
	return {
		...state,
		recipes: state.recipes.concat(action.newRecipe)
	}
};

const loadRecipeSucces = (state, action) => {
	console.log(action.data);
	return {
		...state,
		recipes: state.recipes.concat(action.data)
	}
}

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_RECIPE: return addRecipe( state, action );
        case actionTypes.LOAD_RECIPES_SUCCESS: return loadRecipeSucces( state, action );
        default: return state;
    }

}

export default reducer;
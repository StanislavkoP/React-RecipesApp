import * as actionTypes from '../actions/actionTypes';

const initialState = {
	recipe: null
};


const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
/*         case actionTypes.ADD_RECIPE: return addRecipe( state, action );
        case actionTypes.LOAD_RECIPES_SUCCESS: return loadRecipeSucces( state, action );
 */        default: return state;
    }

}

export default reducer;
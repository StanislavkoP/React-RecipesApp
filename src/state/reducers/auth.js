import * as actionTypes from '../actions/actionTypes';

const initialState = {
	loading: null,
	isAuthed: false,
};

const onAuthStart = (state, action) => {
	return {
		...state,
		loading: true
	}
}

const onAuthSuccess = (state, action) => {
	return {
		...state,
		loading: false,
		isAuthed: true
	}
}

const onAuthLogOut = (state, action) => {
	return {
		...state,
		isAuthed: false
	}
}

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ON_AUTH_START: return onAuthStart( state, action );
        case actionTypes.ON_AUTH_SUCCESS: return onAuthSuccess( state, action );
        case actionTypes.ON_AUTH_LOG_OUT: return onAuthLogOut( state, action );
        default: return state;
    }

}

export default reducer;
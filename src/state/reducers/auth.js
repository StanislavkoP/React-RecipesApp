import * as actionTypes from '../actions/actionTypes';

const initialState = {
	userId: null,
	loading: null,
	isAuthed: false,
	error: null,
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
		userId: action.userId,
		loading: false,
		isAuthed: true
	}
}

const onAuthFailed = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error
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
        case actionTypes.ON_AUTH_FAILED: return onAuthFailed( state, action );
        case actionTypes.ON_AUTH_LOG_OUT: return onAuthLogOut( state, action );
        default: return state;
    }

}

export default reducer;
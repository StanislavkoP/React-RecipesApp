import * as actionsType from './actionTypes';
import axios from 'axios';


const onAuthStart = () => {
	return {
		type: actionsType.ON_AUTH_START
	}
}
const onAuthSuccess = (userId) => {
	return {
		type: actionsType.ON_AUTH_SUCCESS,
		userId: userId
	}
}

const inTimeAuthLogOut = (sessionTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch ( onAuthLogOut() )
		}, sessionTime * 1000)
	}
}

export const onAuth = (email, password, typeSign) => {
	let linkSign;

	if ( typeSign ) {
		linkSign = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAogAJCl62NLKvguX4Bv7WUfHsTpdBLUTk'
	} else {
		linkSign = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAogAJCl62NLKvguX4Bv7WUfHsTpdBLUTk'

	}

	return dispatch => {
		dispatch ( onAuthStart() )
		const authData = {
            email: email,
            password: password,
            returnSecureToken: true
		}
		axios.post(linkSign, authData)
			.then(response => {
				console.log(response)
				const userId = response.data.localId;
				const expirationTime = new Date( new Date().getTime() + response.data.expiresIn * 1000 );
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationTime', expirationTime);
				localStorage.setItem('userId', userId);
				dispatch( onAuthSuccess(userId) );
				dispatch( inTimeAuthLogOut(response.data.expiresIn) );
			})
			.catch(err => {
				console.log(err);
			})
		;
	}


}

export const onAuthLogOut = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationTime');
	localStorage.removeItem('userId');

	return {
		type: actionsType.ON_AUTH_LOG_OUT
	}
}

export const checkAuthLogOut = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		if (!token) {
			dispatch( onAuthLogOut() )
		} else {
			const expirationTime = new Date(localStorage.getItem('expirationTime'));
			if (expirationTime <= new Date()) {
				dispatch( onAuthLogOut() );
			} else {
				dispatch(onAuthSuccess(userId));
				dispatch( inTimeAuthLogOut((expirationTime.getTime() - new Date().getTime()) / 1000 ) );
			}
		}
	}
}
import * as actionsType from '../actions/actionTypes';
import reducer from './auth';

describe('auth', function () {
	it('should return initial state', function () {
		expect(reducer(undefined, {})).toEqual({
			loading: null,
			isAuthed: false,
		})
	});

	it('should return true if user is authed', function () {
		expect(reducer({
			loading: null,
			isAuthed: false,
		}, {
			type: actionsType.ON_AUTH_SUCCESS,
			loading: false,
			isAuthed: true
		})).toEqual({
			loading: false,
			isAuthed: true
		})
	});
})
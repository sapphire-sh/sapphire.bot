import {
	INVALIDATE_CURRENT_USER,
	REQUEST_CURRENT_USER,
	RECEIVE_CURRENT_USER,
} from '../actions/currentUser';

function currentUser(state = {
	'isFetching': false,
	'didInvalidate': true,
	'data': {},
}, action) {
	switch(action.type) {
	case INVALIDATE_CURRENT_USER:
		return Object.assign({}, state, {
			'didInvalidate': true,
		});
	case REQUEST_CURRENT_USER:
		return Object.assign({}, state, {
			'isFetching': true,
			'didInvalidate': false,
		});
	case RECEIVE_CURRENT_USER:
		return Object.assign({}, state, {
			'isFetching': false,
			'didInvalidate': false,
			'data': action.currentUser,
		});
	default:
		return state;
	}
}

export default currentUser;

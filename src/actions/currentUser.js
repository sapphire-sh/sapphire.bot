export const INVALIDATE_CURRENT_USER = 'INVALIDATE_CURRENT_USER';
export const REQUEST_CURRENT_USER = 'REQUEST_CURRENT_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export function invalidateCurrentUser() {
	return {
		'type': INVALIDATE_CURRENT_USER,
	};
}

function requestCurrentUser() {
	return {
		'type': REQUEST_CURRENT_USER,
	};
}

function receiveCurrentUser(currentUser) {
	return {
		'type': RECEIVE_CURRENT_USER,
		'currentUser': currentUser,
	};
}

function fetchCurrentUser() {
	return (dispatch) => {
		dispatch(requestCurrentUser());

		return fetch('/api/currentUser')
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			dispatch(receiveCurrentUser(json));
		})
		.catch((err) => {
			console.log(err);
		});
	};
}

function shouldFetchCurrentUser(state) {
	return state.currentUser.didInvalidate;
}

export function fetchCurrentUserIfNeeded() {
	return (dispatch, getState) => {
		if(shouldFetchCurrentUser(getState())) {
			return dispatch(fetchCurrentUser());
		}
	};
}

import React from 'react';
import {
	PropTypes,
} from 'prop-types';
import {
	connect,
} from 'react-redux';

import {
	invalidateCurrentUser,
	fetchCurrentUserIfNeeded,
} from '../actions/currentUser';

class CurrentUser extends React.Component {
	constructor(props) {
		super(props);

		const dispatch = this.props.dispatch;

		dispatch(invalidateCurrentUser());
		dispatch(fetchCurrentUserIfNeeded());
	}

	render() {
		let currentUser;

		if(this.props.isFetching) {
			currentUser = 'loading';
		}
		else {
			currentUser = this.props.currentUser;
		}

		return (
			<div>
				{ currentUser }
			</div>
		);
	}
}

CurrentUser.propTypes = {
	'dispatch': PropTypes.func.isRequired,
	'isFetching': PropTypes.bool.isRequired,
	'currentUser': PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	const currentUser = state.currentUser.data;

	return {
		'isFetching': state.currentUser.isFetching,
		'currentUser': currentUser,
	};
}

export default connect(mapStateToProps)(CurrentUser);

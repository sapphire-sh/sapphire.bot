import React from 'react';
import {
	Redirect,
} from 'react-router-dom';

import {
	fetchPost,
} from '../utils/fetch';

class Entry extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'password': '',
			'login': false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			'password': e.target.value,
		});
	}

	handleSubmit(e) {
		fetchPost('/login', {
			'password': this.state.password,
		})
		.then((data) => {
			if(data) {
				this.setState({
					'login': data,
				});
			}
			else {
				alert('wrong password');
			}
		});

		e.preventDefault();
	}

	render() {
		if(this.state.login) {
			return (
				<Redirect to="/auth" />
			);
		}

		return (
			<form className="ui form" onSubmit={ this.handleSubmit }>
				<div className="field">
					<label>password</label>
					<input type="password" value={ this.state.password } onChange={ this.handleChange } />
				</div>
				<button className="ui button" type="submit">submit</button>
			</form>
		);
	}
}

export default Entry;

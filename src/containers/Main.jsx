import React from 'react';
import {
	Link,
} from 'react-router-dom';

class Main extends React.Component {
	render() {
		const d = new Date();
		const date = d.toISOString().substr(0, 10);
		const hour = d.getHours();

		return (
			<div>1234</div>
		);
	}
}

export default Main;

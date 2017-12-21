import React from 'react';
import {
	Switch,
	Route,
} from 'react-router-dom';

import Entry from './Entry';
import Main from './Main';
import NotFound from './errors/NotFound';

import 'semantic-ui-css/semantic.min.css';
import '../styles.css';

class App extends React.Component {
	render() {
		return (
			<div className="ui container">
				<Switch>
					<Route exact path="/" component={ Entry } />
					<Route exact path="/i" component={ Main } />
					<Route path="*" component={ NotFound } />
				</Switch>
			</div>
		);
	}
}

export default App;

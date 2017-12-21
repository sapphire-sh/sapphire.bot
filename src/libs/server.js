import path from 'path';

import Express from 'express';

import config from '../../configs/webpack.client';

import middlewares from '../middlewares';
import routers from '../routers';

import Database from './database';
import Twitter from './twitter';

import HTML from '../utils/HTML';

class Server {
	constructor() {
		let self = this;

		const app = Express();

		app.use('/', Express.static(config.output.path));

		middlewares.forEach((middleware) => {
			app.use(middleware);
		});

		routers.forEach(({
			path,
			router,
		}) => {
			app.use(path, router);
		});

		app.get('/', (req, res, next) => {
			if(Twitter.isInitialized) {
				res.redirect('/i');
			}
			else {
				next();
			}
		});

		app.get('*', (req, res) => {
			res.send(HTML());
		});

		app.listen(process.env.PORT, () => {
			console.log(`port: ${process.env.PORT}`);
		});

		self.app = app;
	}
}

export default Server;

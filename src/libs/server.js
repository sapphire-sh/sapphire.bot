import Express from 'express';

import Authentication from '../routers/authentication';

import Database from './database';
import Twitter from './twitter';

class Server {
	constructor() {
		let self = this;

		const app = Express();

		app.use('/auth', Authentication);

		app.get('/', (req, res) => {
			Database.getOAuthToken()
			.then((token) => {
				self.twitter = new Twitter({
					'consumer_key': process.env.consumer_key,
					'consumer_secret': process.env.consumer_secret,
					...token,
				});
			})
			.catch((err) => {

			});
		});

		app.listen(process.env.PORT, () => {
			console.log(`port: ${process.env.PORT}`);
		});

		self.app = app;
	}
}

export default Server;

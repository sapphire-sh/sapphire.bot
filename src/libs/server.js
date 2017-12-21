import path from 'path';

import Express from 'express';

import morgan from 'morgan';

import webpack from 'webpack';

import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import config from '../../configs/webpack.client.dev';

import Authentication from '../routers/authentication';

import Database from './database';
import Twitter from './twitter';

import HTML from '../utils/HTML';

class Server {
	constructor() {
		let self = this;

		const app = Express();

		/* istanbul ignore if */
		if(process.env.NODE_ENV !== 'test') {
			app.use(morgan('common'));
		}

		/* istanbul ignore if */
		if(process.env.NODE_ENV === 'dev') {
			const compiler = webpack(config);
			app.use(WebpackDevMiddleware(compiler, {
				'noInfo': true,
				'quiet': true,
				'publicPath': config.output.publicPath,
			}));
			app.use(WebpackHotMiddleware(compiler));
		}

		app.use('/', Express.static(path.resolve(__dirname, '../../dist')));

		app.use('/auth', Authentication);

		app.get('/', (req, res) => {
			Database.getOAuthToken()
			.then((token) => {
				const {
					access_token,
					access_token_secret,
				} = token;

				if(access_token === undefined || access_token_secret === undefined) {
					res.redirect('/auth');
				}
				else {
					self.twitter = new Twitter({
						'consumer_key': process.env.consumer_key,
						'consumer_secret': process.env.consumer_secret,
						...token,
					});

					res.redirect('/i');
				}
			})
			.catch((err) => {
				res.redirect('/auth');
			});
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

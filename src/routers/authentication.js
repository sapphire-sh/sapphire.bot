import Express from 'express';

import OAuth from '../libs/oauth';
import Database from '../libs/database';
import Twitter from '../libs/twitter';

const router = Express.Router();

router.get('/', (req, res) => {
	OAuth.initialize();
	OAuth.getRequestToken()
	.then((token) => {
		req.session.oauth = token;

		res.redirect(`https://twitter.com/oauth/authenticate?oauth_token=${token.oauth_token}`);
	})
	.catch((err) => {
		console.log(err);
		res.status(500).json(err);
	});
});

function validateToken(session) {
	if(session.oauth_token === undefined) {
		return false;
	}
	if(session.oauth_token_secret === undefined) {
		return false;
	}
	if(session.oauth_verifier === undefined) {
		return false;
	}
	return true;
}

router.get('/callback', (req, res) => {
	const oauth_verifier = req.query.oauth_verifier;
	req.session.oauth_verifier = oauth_verifier;

	if(validateToken(req.session)) {
		res.redirect('/');
	}
	else {
		OAuth.getAccessToken({
			'oauth_verifier': oauth_verifier,
		})
		.then((token) => {
			const {
				consumer_key,
				consumer_secret,
			} = process.env;

			Twitter.initialize({
				'consumer_key': consumer_key,
				'consumer_secret': consumer_secret,
				...token,
			});

			delete req.session.oauth;

			res.redirect('/i');
		})
		.catch((err) => {
			res.status(500).json(err);
		});
	}
});

export default router;

import Express from 'express';

import OAuth from '../libs/oauth';
import Database from '../libs/database';

const router = Express.Router();

let oauth_token;
let oauth_token_secret;

router.get('/', (req, res) => {
	OAuth.getRequestToken()
	.then((token) => {
		oauth_token = token.oauth_token;
		oauth_token_secret = token.oauth_token_secret;

		res.redirect(`https://twitter.com/oauth/authenticate?oauth_token=${oauth_token}`);
	})
	.catch((err) => {
		console.log(err);
		res.status(500).json(err);
	});
});

router.get('/callback', (req, res) => {
	const oauth_verifier = req.query.oauth_verifier;

	if(oauth_token === undefined || oauth_token_secret === undefined || oauth_verifier === undefined) {
		res.redirect('/');
	}
	else {
		OAuth.getAccessToken({
			'oauth_verifier': oauth_verifier,
		})
		.then((token) => {
			return Database.setOAuthToken(token);
		})
		.then(() => {
			res.redirect('/');
		})
		.catch((err) => {
			res.status(500).json(err);
		});
	}
});

export default router;

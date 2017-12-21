import Twitter from '../libs/twitter';

export function loginValidator(req, res, next) {
	console.log(req.session);
	if(req.session.login) {
		next();
	}
	else {
		res.redirect('/');
	}
}

export function twitterValidator(req, res, next) {
	if(Twitter.isInitialized) {
		next();
	}
	else {
		res.redirect('/');
	}
}

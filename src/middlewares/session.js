import Express from 'express';

import session from 'express-session';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);

const router = Express.Router();

router.use(session({
	'store': new RedisStore(),
	'cookie': {
		'path': '/',
		'httpOnly': true,
		'secure': false,
		'maxAge': 3600,
	},
	'secret': `${process.env.screen_name}.sapphire.bot`,
	'saveUninitialized': false,
	'resave': false,
}));

export default router;

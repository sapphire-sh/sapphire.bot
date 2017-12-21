import Express from 'express';

import {
	loginValidator,
	twitterValidator,
} from '../utils/accountValidator';

const router = Express.Router();

router.use('/i', loginValidator);
router.use('/api', loginValidator);
router.use('/auth', loginValidator);

router.use('/i', twitterValidator);
router.use('/api', twitterValidator);

export default router;

import Express from 'express';

import Twitter from '../libs/twitter';

const router = Express.Router();

router.get('/currentUser', (req, res) => {
	Twitter.getCurrentUser()
	.then((data) => {
		res.json(data);
	})
	.catch((err) => {
		res.status(500).json(err);
	});
});

export default router;

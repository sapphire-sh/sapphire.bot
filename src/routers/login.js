import Express from 'express';

const router = Express.Router();

router.post('/', (req, res) => {
	if(process.env.password === '') {
		res.json(false);
	}
	else {
		if(process.env.password === req.body.password) {
			req.session.login = true;

			res.json(true);
		}
		else {
			res.json(false);
		}
	}
});

export default router;

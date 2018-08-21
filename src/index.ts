import {
	App,
} from './app';

const app = new App();
(async () => {
	try {
		await app.start();
	}
	catch(err) {
		console.error(err);
	}
})();

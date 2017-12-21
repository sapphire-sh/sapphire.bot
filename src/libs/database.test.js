import Database from './database';

describe('./libs/database.js', () => {
	test('test', (done) => {
		done();
	});

	afterAll(() => {
		Database.close();
	});
});

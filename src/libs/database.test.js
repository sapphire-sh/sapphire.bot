import Database from './database';

describe('./libs/database.js', () => {
	it('test', (done) => {
		done();
	});

	afterAll(() => {
		Database.close();
	});
});

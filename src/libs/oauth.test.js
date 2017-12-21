import OAuth from './oauth';

jest.mock('../../__mocks__/oauth.js');

describe('./libs/oauth.js', () => {
	it('get request token', (done) => {
		OAuth.getRequestToken()
		.then((token) => {
			done();
		})
		.catch((err) => {
			expect(err).toBeNull();
		});
	});

	it('get access token', (done) => {
		OAuth.getAccessToken({})
		.then((token) => {
			done();
		})
		.catch((err) => {
			expect(err).toBeNull();
		});
	});
});

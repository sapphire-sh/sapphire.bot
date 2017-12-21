import OAuth from './oauth';

jest.mock('../../__mocks__/oauth.js');

describe('./libs/oauth.js', () => {
	beforeAll(() => {
		OAuth.initialize();
	});

	test('get request token', (done) => {
		OAuth.getRequestToken()
		.then((token) => {
			done();
		})
		.catch((err) => {
			expect(err).toBeNull();
		});
	});

	test('get access token', (done) => {
		OAuth.getAccessToken({})
		.then((token) => {
			done();
		})
		.catch((err) => {
			expect(err).toBeNull();
		});
	});
});

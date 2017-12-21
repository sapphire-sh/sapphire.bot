import Promise from 'bluebird';

import Twit from 'twit';

class Twitter {
	static isInitialized;

	static initialize(token) {
		let self = this;

		self.twit = new Twit(token);

		self.isInitialized = true;
	}

	static get(url, params) {
		let self = this;

		if(self.isInitialized === false) {
			return Promise.reject('twit is not initialized');
		}

		if(params === undefined) {
			params = {};
		}

		return new Promise((resolve, reject) => {
			self.twit.get(url, params, (err, res) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(res);
				}
			});
		});
	}

	static post(url, params) {
		let self = this;

		if(self.isInitialized === false) {
			return Promise.reject('twit is not initialized');
		}

		if(params === undefined) {
			params = {};
		}

		return new Promise((resolve, reject) => {
			self.twit.post(url, params, (err, res) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(res);
				}
			});
		});
	}

	static getCurrentUser() {
		let self = this;

		return self.get('account/verify_credentials');
	}
}

export default Twitter;

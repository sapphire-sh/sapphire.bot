import Promise from 'bluebird';
import _redis from 'redis';

import {
	inflate,
	deflate,
} from '../utils/zlib';

const redis = _redis.createClient();

redis.on('error', (err) => {
	console.log(`redis-error: ${err}`);
});

class Database {
	static close() {
		redis.quit();
	}

	static set(key, value, expire) {
		let self = this;

		let args = [
			key,
			value,
		];
		if(expire !== undefined) {
			args.concat([
				'EX',
				expire,
			]);
		}

		return new Promise((resolve, reject) => {
			redis.set(...args, (err, reply) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(reply);
				}
			});
		});
	}

	static get(key) {
		let self = this;

		return new Promise((resolve, reject) => {
			redis.get(key, (err, reply) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(reply);
				}
			});
		});
	}

	static hset(key, value, expire) {
		let self = this;

		let args = [
			key,
			value,
		];
		if(expire !== undefined) {
			args.concat([
				'EX',
				expire,
			]);
		}

		return new Promise((resolve, reject) => {
			redis.hset(...args, (err, reply) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(reply);
				}
			});
		});
	}

	static hget(key) {
		let self = this;

		return new Promise((resolve, reject) => {
			redis.hget(key, (err, reply) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(reply);
				}
			});
		});
	}

	static setOAuthToken(token) {
		let self = this;

		return deflate(token).then((data) => {
			return self.set('oauth', data.toString('base64'));
		});
	}

	static getOAuthToken() {
		let self = this;

		return self.get('oauth').then((data) => {
			return inflate(new Buffer(data, 'base64'));
		});
	}
}

export default Database;

import Twit from 'twit';

class Twitter {
	constructor(token) {
		let self = this;

		self.twit = new Twit(token);
	}
}

export default Twitter;

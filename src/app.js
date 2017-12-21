import Server from './libs/server';

class App {
	constructor() {
		let self = this;

		const server = new Server();

		self.server = server;
	}
}

const app = new App();

export default App;

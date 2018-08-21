import {
	Parser,
} from './libs';

import {
	Command,
} from './models';

export class App {
	private parser: Parser;

	constructor() {
		this.parser = new Parser();
	}

	public async start() {
		console.log('app start');

		await this.parser.initialize();
		this.parser.start();

		const command: Command = {
			'selectorQuery': 'table.board_list_table tr.table_body:not(.notice)',
			'url': 'http://bbs.ruliweb.com/news/board/1020',
		};

		this.parser.push(command);
	}
}

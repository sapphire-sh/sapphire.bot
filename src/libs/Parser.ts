import puppeteer, {
	Browser,
	Page,
} from 'puppeteer';

import {
	Command,
} from '../models';

export class Parser {
	private shouldProcess: boolean = false;
	private browser: Browser = null;
	private commandQueue: Command[] = [];

	public async initialize() {
		console.log('parser initialize');

		this.browser = await puppeteer.launch();
		this.shouldProcess = true;
	}

	public async start() {
		console.log('parser start');

		while(this.shouldProcess) {
			await this.process();

			await new Promise((resolve) => {
				setTimeout(resolve, 1000);
			});
		}
	}

	public push(command: Command) {
		this.commandQueue.push(command);
	}

	private async open(url: string): Promise<Page> {
		console.log(`open: ${url}`);

		const context = await this.browser.createIncognitoBrowserContext();

		const page = await context.newPage();
		await page.goto(url, {
			'waitUntil': 'networkidle2',
		});

		return page;
	}

	private async parse(command: Command) {
		console.log('parse');

		const {
			url,
			selectorQuery,
		} = command;

		const page = await this.open(url);

		const elements = await page.$$(selectorQuery);

		for(const element of elements) {
			const [
				id,
				type,
			] = await element.$$eval('td', (e) => {
				return [
					e[0].textContent.trim(),
					e[1].textContent.trim(),
				];
			});

			const [
				title,
				link,
			] = await element.$$eval('td a', (e) => {
				return [
					e[1].getAttribute('href'),
					e[1].textContent.trim(),
				];
			});

			console.log({
				id,
				type,
				title,
				link,
			});
		}
	}

	private async process() {
		console.log(`parser process ${this.commandQueue.length}`);
		if(this.shouldProcess === false) {
			return;
		}
		if(this.browser === null) {
			return;
		}
		if(this.commandQueue.length === 0) {
			return;
		}

		const command = this.commandQueue.shift();
		await this.parse(command);
	}
}

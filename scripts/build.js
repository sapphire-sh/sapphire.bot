import webpack from 'webpack';

import clientConfig from '../configs/webpack.config.client';
import serverConfig from '../configs/webpack.config.server';

function getConfig(target) {
	switch(target) {
	case 'client':
		return clientConfig;
	case 'server':
		return serverConfig;
	}
}

const config = getConfig(process.env.NODE_TARGET);

function build() {
	webpack(config, (err, stats) => {
		if(err) {
			console.log(err);
		}
		else {
			process.stdout.write(`${stats.toString({
				'colors': true,
				'modules': true,
				'children': false,
				'chunks': false,
				'chunkModules': false,
			})}\n`);
		}
	});
}

build();

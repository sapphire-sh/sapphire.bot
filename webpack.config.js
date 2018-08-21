const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');

const distPath = path.resolve(__dirname, './dist');
const dllPath = path.resolve(__dirname, './dll');

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const envPath = path.resolve(__dirname, './.env');

module.exports = {
	'entry': path.resolve(__dirname, './src', 'index.ts'),
	'output': {
		'path': distPath,
		'filename': 'main.js',
	},
	'module': {
		'rules': [
			{
				'test': /\.tsx?$/,
				'use': [
					'ts-loader',
				],
			},
		],
	},
	'devtool': '#source-map',
	'resolve': {
		'extensions': [
			'.ts',
			'.tsx',
			'.js',
			'.json',
		],
	},
	'plugins': [
		new webpack.DefinePlugin({
			'__dev': (process.env.NODE_ENV === 'development'),
			'__env': (() => {
				if(process.env.TRAVIS === 'true') {
					return {
						'database_user': 'root',
						'database_password': 'test',
						'database_name': 'test',
					};
				}

				const data = fs.readFileSync(envPath);
				return JSON.stringify(data.toString().trim().split('\n').map((e) => {
					const t = e.split('=');
					return {
						[t[0]]: t[1],
					};
				}).reduce((a, b) => {
					return {
						...a,
						...b,
					};
				}));
			})(),
			'__path': JSON.stringify({
				'dist': distPath,
				'dll': dllPath,
			}),
		}),
		new webpack.ProgressPlugin(),
	],
	'target': 'node',
	'mode': env,
	'externals': [
		nodeExternals(),
	],
};

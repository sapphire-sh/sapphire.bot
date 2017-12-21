import api from './api';
import authentication from './authentication';
import login from './login';

export default [
	{
		'path': '/api',
		'router': api,
	},
	{
		'path': '/auth',
		'router': authentication,
	},
	{
		'path': '/login',
		'router': login,
	},
];

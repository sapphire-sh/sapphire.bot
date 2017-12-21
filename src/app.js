const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.json('hello');
});

app.listen(process.env.PORT, () => {
	console.log(`port: ${process.env.PORT}`);
});

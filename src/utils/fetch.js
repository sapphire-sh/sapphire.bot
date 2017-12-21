export function fetchGet(url) {
	return fetch(url)
	.then((res) => {
		return res.json();
	});
}

export function fetchPost(url, body) {
	return fetch(url, {
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json',
		},
		'body': JSON.stringify(body),
	})
	.then((res) => {
		return res.json();
	});
}

const regexExpr = /^\/.+(\.\w+$)/; // Regex expression than matches paths requestiong an object. i.e: /route1/my-picture.png

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handler(event) {
	const request = event.request;
	const olduri = request.uri;

	// Redirige les URLs se terminant par / vers leur version sans /
	if (olduri.endsWith('/') && olduri.length > 1) {
		const newuri = olduri.slice(0, -1);
		return {
			statusCode: 301,
			statusDescription: 'Moved Permanently',
			headers: { location: { value: newuri } }
		};
	}

	if (isRoute(olduri)) {
		let newuri = olduri;
		if (olduri === '/') {
			newuri = '/index.html';
		} else if (!olduri.endsWith('.html')) {
			newuri = olduri + '.html';
		}
		request.uri = newuri;
		console.log('Request for [' + olduri + '], rewritten to [' + newuri + ']');
	}

	return request;
}

// Returns true if uri is a route. i.e: /route1
// Returns false if uri is a file. i.e: /route1/index.html
function isRoute(uri) {
	return !regexExpr.test(uri);
}

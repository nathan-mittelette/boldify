var regexExpr = /^\/.+(\.\w+$)/; // Regex expression than matches paths requestiong an object. i.e: /route1/my-picture.png

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handler(event) {
	var request = event.request;
	var olduri = request.uri;

	if (isRoute(olduri) && !olduri.endsWith('.html')) {
		// Redirect to the HTML version of the path
		var newuri = olduri + '.html';

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

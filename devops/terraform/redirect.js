// Only normalize aliases of published pages, not arbitrary HTML files or assets.
const pagePath = /^\/(?:x(?:\/(?:about|help|how-it-works|mcp))?|(?:fr|en|es|pt|de|tr|pl)(?:\/x)?(?:\/(?:about|help|how-it-works|mcp))?)$/;
const filePath = /\.\w+$/;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handler(event) {
	const request = event.request;
	const uri = request.uri;

	if (uri.startsWith('/.well-known/')) return request;

	const path = uri.replace(/\/+$/, '').replace(/\.html$/, '');
	if (path === '/index' || pagePath.test(path)) {
		let canonical = path;
		if (path === '/index' || path === '/fr') canonical = '/';
		else if (path === '/fr/x' || path.startsWith('/fr/x/')) canonical = path.slice(3);

		if (canonical !== uri) {
			return {
				statusCode: 301,
				statusDescription: 'Moved Permanently',
				headers: { location: { value: canonical + querySuffix(request.querystring) } }
			};
		}
	}

	// Rewrite the request sent to S3 without exposing its .html object keys.
	if (uri === '/') request.uri = '/index.html';
	else if (!uri.endsWith('/') && !filePath.test(uri)) request.uri = `${uri}.html`;

	return request;
}

function querySuffix(querystring) {
	const pairs = [];
	// CloudFront JS 2.0 does not support for-of or destructuring.
	Object.keys(querystring).forEach((name) => {
		const entry = querystring[name];
		const values = entry.multiValue || [entry];
		values.forEach((item) => {
			pairs.push(`${encodeQueryPart(name)}=${encodeQueryPart(item.value)}`);
		});
	});
	return pairs.length ? `?${pairs.join('&')}` : '';
}

// Preserve existing percent escapes and '+' while escaping literal delimiters.
function encodeQueryPart(value) {
	return value.replace(/%[\da-f]{2}|\+|[^%+]+|%/gi, (part) =>
		part === '+' || /^%[\da-f]{2}$/i.test(part) ? part : encodeURIComponent(part)
	);
}

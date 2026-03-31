import fs from 'fs';

const API_URL = 'https://api.indexnow.org/indexnow';

const host = 'boldify.net';
const urls = [
	'https://boldify.net/',
	'https://boldify.net/en',
	'https://boldify.net/fr/about',
	'https://boldify.net/en/about',
	'https://boldify.net/fr/how-it-works',
	'https://boldify.net/en/how-it-works',
	'https://boldify.net/fr/help',
	'https://boldify.net/en/help',
	'https://boldify.net/de',
	'https://boldify.net/de/about',
	'https://boldify.net/de/how-it-works',
	'https://boldify.net/de/help',
	'https://boldify.net/es',
	'https://boldify.net/es/about',
	'https://boldify.net/es/how-it-works',
	'https://boldify.net/es/help',
	'https://boldify.net/tr',
	'https://boldify.net/tr/about',
	'https://boldify.net/tr/how-it-works',
	'https://boldify.net/tr/help',
	'https://boldify.net/pl',
	'https://boldify.net/pl/about',
	'https://boldify.net/pl/how-it-works',
	'https://boldify.net/pl/help',
	'https://boldify.net/pt',
	'https://boldify.net/pt/about',
	'https://boldify.net/pt/how-it-works',
	'https://boldify.net/pt/help'
];

const output = 'build';

const apiKey = findKeyFile(output);

if (!apiKey) {
	console.error('❌ IndexNow key file not found in build directory.');
	process.exit(1);
}

fetch(API_URL, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		host: host,
		key: apiKey.replace('.txt', ''),
		urlList: urls
	})
})
	.then((response) => {
		if (response.ok) {
			console.log('✅ IndexNow notification sent successfully.');
		} else {
			console.error('❌ Failed to send IndexNow notification.', response.statusText);
		}
	})
	.catch((error) => {
		console.error('❌ Error sending IndexNow notification.', error);
	});

function findKeyFile(dir) {
	const files = fs.readdirSync(dir);
	for (const file of files) {
		if (file.endsWith('.txt')) {
			return file;
		}
	}
	return null;
}

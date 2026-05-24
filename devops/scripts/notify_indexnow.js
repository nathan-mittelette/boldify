import fs from 'fs';
import path from 'path';

const API_URL = 'https://api.indexnow.org/indexnow';
const host = 'boldify.net';
const outputDir = 'build';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || findKeyFile(outputDir);

if (!INDEXNOW_KEY) {
	console.error('❌ INDEXNOW_KEY env var not set and no key file found in build/');
	process.exit(1);
}

const sitemapPath = path.join(outputDir, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
	console.error('❌ sitemap.xml not found in build/');
	process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const urls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

fetch(API_URL, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		host,
		key: INDEXNOW_KEY,
		keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
		urlList: urls
	})
})
	.then((response) => {
		if (response.ok) {
			console.log(`✅ IndexNow notification sent (${urls.length} URLs).`);
		} else {
			console.error('❌ IndexNow notification failed:', response.statusText);
			process.exit(1);
		}
	})
	.catch((error) => {
		console.error('❌ IndexNow notification error:', error);
		process.exit(1);
	});

function findKeyFile(dir) {
	if (!fs.existsSync(dir)) return null;
	const file = fs.readdirSync(dir).find((f) => f.endsWith('.txt'));
	return file ? file.replace('.txt', '') : null;
}

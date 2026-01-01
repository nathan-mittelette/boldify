import fs from 'fs';
import path from 'path';

const outputDir = 'build';

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
	console.log(`📁 Created directory: ${outputDir}`);
}

const routes = [
	{ loc: 'https://boldify.net', priority: '1.0' },
	{ loc: 'https://boldify.net/fr', priority: '1.0' },
	{ loc: 'https://boldify.net/en', priority: '1.0' },
	{ loc: 'https://boldify.net/fr/about', priority: '0.9' },
	{ loc: 'https://boldify.net/en/about', priority: '0.9' },
	{ loc: 'https://boldify.net/fr/how-it-works', priority: '0.9' },
	{ loc: 'https://boldify.net/en/how-it-works', priority: '0.9' },
	{ loc: 'https://boldify.net/fr/help', priority: '0.7' },
	{ loc: 'https://boldify.net/en/help', priority: '0.7' }
];

const today = new Date().toISOString().split('T')[0];

const generateSitemap = () => {
	const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${routes
		.map(
			({ loc, priority }) => `
		<url>
				<loc>${loc}</loc>
				<lastmod>${today}</lastmod>
				<changefreq>daily</changefreq>
				<priority>${priority}</priority>
		</url>`
		)
		.join('')}
</urlset>`;

	const filePath = path.join(outputDir, 'sitemap.xml');
	fs.writeFileSync(filePath, sitemap.trim());
	console.log('✅ sitemap.xml generated!');
};

generateSitemap();

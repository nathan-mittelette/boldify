import fs from 'fs';
import path from 'path';

const outputDir = 'build';

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
	console.log(`📁 Created directory: ${outputDir}`);
}

const langs = ['fr', 'en', 'es', 'pt', 'de', 'tr', 'pl'];

// Home page: fr is at /, others at /lang
const homeAlternates = [
	...langs.map((lang) => ({
		lang,
		url: lang === 'fr' ? 'https://boldify.net' : `https://boldify.net/${lang}`
	})),
	{ lang: 'x-default', url: 'https://boldify.net' }
];

// Sub-pages: all at /lang/path
function buildAlternates(pagePath) {
	return [
		...langs.map((lang) => ({ lang, url: `https://boldify.net/${lang}${pagePath}` })),
		{ lang: 'x-default', url: `https://boldify.net/fr${pagePath}` }
	];
}

const routes = [
	{ loc: 'https://boldify.net', priority: '1.0', alternates: homeAlternates },
	{ loc: 'https://boldify.net/en', priority: '1.0', alternates: homeAlternates },
	{ loc: 'https://boldify.net/es', priority: '1.0', alternates: homeAlternates },
	{ loc: 'https://boldify.net/pt', priority: '1.0', alternates: homeAlternates },
	{ loc: 'https://boldify.net/de', priority: '1.0', alternates: homeAlternates },
	{ loc: 'https://boldify.net/tr', priority: '1.0', alternates: homeAlternates },
	{ loc: 'https://boldify.net/pl', priority: '1.0', alternates: homeAlternates },
	{ loc: 'https://boldify.net/fr/about', priority: '0.9', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/en/about', priority: '0.9', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/es/about', priority: '0.9', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/pt/about', priority: '0.9', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/de/about', priority: '0.9', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/tr/about', priority: '0.9', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/pl/about', priority: '0.9', alternates: buildAlternates('/about') },
	{
		loc: 'https://boldify.net/fr/how-it-works',
		priority: '0.9',
		alternates: buildAlternates('/how-it-works')
	},
	{
		loc: 'https://boldify.net/en/how-it-works',
		priority: '0.9',
		alternates: buildAlternates('/how-it-works')
	},
	{
		loc: 'https://boldify.net/es/how-it-works',
		priority: '0.9',
		alternates: buildAlternates('/how-it-works')
	},
	{
		loc: 'https://boldify.net/pt/how-it-works',
		priority: '0.9',
		alternates: buildAlternates('/how-it-works')
	},
	{
		loc: 'https://boldify.net/de/how-it-works',
		priority: '0.9',
		alternates: buildAlternates('/how-it-works')
	},
	{
		loc: 'https://boldify.net/tr/how-it-works',
		priority: '0.9',
		alternates: buildAlternates('/how-it-works')
	},
	{
		loc: 'https://boldify.net/pl/how-it-works',
		priority: '0.9',
		alternates: buildAlternates('/how-it-works')
	},
	{ loc: 'https://boldify.net/fr/help', priority: '0.7', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/en/help', priority: '0.7', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/es/help', priority: '0.7', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/pt/help', priority: '0.7', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/de/help', priority: '0.7', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/tr/help', priority: '0.7', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/pl/help', priority: '0.7', alternates: buildAlternates('/help') }
];

const today = new Date().toISOString().split('T')[0];

const generateSitemap = () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${routes
		.map(
			({ loc, priority, alternates }) => `
	<url>
		<loc>${loc}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>daily</changefreq>
		<priority>${priority}</priority>
${alternates.map((a) => `		<xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}"/>`).join('\n')}
	</url>`
		)
		.join('')}
</urlset>`;

	const filePath = path.join(outputDir, 'sitemap.xml');
	fs.writeFileSync(filePath, sitemap.trim());
	console.log('✅ sitemap.xml generated!');
};

generateSitemap();

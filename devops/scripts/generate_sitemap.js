import fs from 'fs';
import path from 'path';
import { execSync } from 'node:child_process';

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
		url: lang === 'fr' ? 'https://boldify.net/' : `https://boldify.net/${lang}`
	})),
	{ lang: 'x-default', url: 'https://boldify.net/' }
];

// Sub-pages: all at /lang/path; x-default → /en (international fallback)
function buildAlternates(pagePath) {
	return [
		...langs.map((lang) => ({ lang, url: `https://boldify.net/${lang}${pagePath}` })),
		{ lang: 'x-default', url: `https://boldify.net/en${pagePath}` }
	];
}

function getGitDate(file) {
	try {
		const result = execSync(`git log -1 --format=%cI -- "${file}"`, { encoding: 'utf8' }).trim();
		return result ? result.slice(0, 10) : null;
	} catch {
		return null;
	}
}

const today = new Date().toISOString().split('T')[0];

function getLastMod(loc) {
	const pathname = new URL(loc).pathname.replace(/\/$/, '');
	const segments = pathname.split('/').filter(Boolean);

	let routeFile;
	let lang = 'fr';

	if (segments.length === 0) {
		routeFile = 'src/routes/+page.svelte';
	} else if (segments.length === 1) {
		lang = segments[0];
		routeFile = 'src/routes/[lang=lang]/+page.svelte';
	} else {
		lang = segments[0];
		const sub = segments.slice(1).join('/');
		routeFile = `src/routes/[lang=lang]/${sub}/+page.svelte`;
	}

	const dates = [routeFile, `src/locales/${lang}.json`].map(getGitDate).filter(Boolean);
	return dates.length > 0 ? [...dates].sort().reverse()[0] : today;
}

const routes = [
	{ loc: 'https://boldify.net/', alternates: homeAlternates },
	{ loc: 'https://boldify.net/en', alternates: homeAlternates },
	{ loc: 'https://boldify.net/es', alternates: homeAlternates },
	{ loc: 'https://boldify.net/pt', alternates: homeAlternates },
	{ loc: 'https://boldify.net/de', alternates: homeAlternates },
	{ loc: 'https://boldify.net/tr', alternates: homeAlternates },
	{ loc: 'https://boldify.net/pl', alternates: homeAlternates },
	{ loc: 'https://boldify.net/fr/about', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/en/about', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/es/about', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/pt/about', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/de/about', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/tr/about', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/pl/about', alternates: buildAlternates('/about') },
	{ loc: 'https://boldify.net/fr/how-it-works', alternates: buildAlternates('/how-it-works') },
	{ loc: 'https://boldify.net/en/how-it-works', alternates: buildAlternates('/how-it-works') },
	{ loc: 'https://boldify.net/es/how-it-works', alternates: buildAlternates('/how-it-works') },
	{ loc: 'https://boldify.net/pt/how-it-works', alternates: buildAlternates('/how-it-works') },
	{ loc: 'https://boldify.net/de/how-it-works', alternates: buildAlternates('/how-it-works') },
	{ loc: 'https://boldify.net/tr/how-it-works', alternates: buildAlternates('/how-it-works') },
	{ loc: 'https://boldify.net/pl/how-it-works', alternates: buildAlternates('/how-it-works') },
	{ loc: 'https://boldify.net/fr/help', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/en/help', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/es/help', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/pt/help', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/de/help', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/tr/help', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/pl/help', alternates: buildAlternates('/help') },
	{ loc: 'https://boldify.net/fr/mcp', alternates: buildAlternates('/mcp') },
	{ loc: 'https://boldify.net/en/mcp', alternates: buildAlternates('/mcp') },
	{ loc: 'https://boldify.net/es/mcp', alternates: buildAlternates('/mcp') },
	{ loc: 'https://boldify.net/pt/mcp', alternates: buildAlternates('/mcp') },
	{ loc: 'https://boldify.net/de/mcp', alternates: buildAlternates('/mcp') },
	{ loc: 'https://boldify.net/tr/mcp', alternates: buildAlternates('/mcp') },
	{ loc: 'https://boldify.net/pl/mcp', alternates: buildAlternates('/mcp') }
];

const generateSitemap = () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${routes
		.map(
			({ loc, alternates }) => `
	<url>
		<loc>${loc}</loc>
		<lastmod>${getLastMod(loc)}</lastmod>
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

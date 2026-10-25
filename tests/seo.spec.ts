import { expect, test } from '@playwright/test';

for (const language of ['fr', 'en', 'es', 'pt', 'de', 'tr', 'pl']) {
	test(`prerendered SEO is distinct and consistent across platforms: ${language}`, async ({
		page,
		request
	}) => {
		const titles = new Set<string>();
		const descriptions = new Set<string>();
		const headings = new Set<string>();
		for (const platform of ['linkedin', 'x']) {
			for (const section of ['', 'about', 'how-it-works', 'help', 'mcp']) {
				const home =
					platform === 'x'
						? language === 'fr'
							? '/x'
							: `/${language}/x`
						: language === 'fr'
							? '/'
							: `/${language}`;
				const path = section
					? platform === 'x'
						? `${home}/${section}`
						: `/${language}/${section}`
					: home;
				const response = await request.get(path);
				expect(response.status(), path).toBe(200);
				// Parse the response HTML, before client-side hydration can repair metadata.
				const seo = await page.evaluate(
					(html) => {
						const doc = new DOMParser().parseFromString(html, 'text/html');
						const content =
							doc.querySelector('main') ?? doc.querySelector('#text-editor')!.parentElement!;
						return {
							titles: [...doc.querySelectorAll('title')].map((node) => node.textContent ?? ''),
							descriptions: [...doc.querySelectorAll('meta[name="description"]')].map(
								(node) => node.getAttribute('content') ?? ''
							),
							canonical: [...doc.querySelectorAll('link[rel="canonical"]')].map((node) =>
								node.getAttribute('href')
							),
							alternates: [...doc.querySelectorAll('link[hreflang]')].map((node) =>
								node.getAttribute('href')
							),
							h1: [...content.querySelectorAll('h1')].map((node) => node.textContent?.trim() ?? ''),
							levels: [...content.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((node) =>
								Number(node.tagName[1])
							),
							imagesWithoutAlt: [...doc.querySelectorAll('img')]
								.filter((node) => !node.getAttribute('alt')?.trim())
								.map((node) => node.src),
							schemas: [...doc.querySelectorAll('script[type="application/ld+json"]')].map((node) =>
								JSON.parse(node.textContent ?? '')
							),
							ogDescription: doc
								.querySelector('meta[property="og:description"]')
								?.getAttribute('content'),
							twitterDescription: doc
								.querySelector('meta[name="twitter:description"]')
								?.getAttribute('content')
						};
					},
					await response.text()
				);
				expect(seo.titles, path).toHaveLength(1);
				expect(seo.descriptions, path).toHaveLength(1);
				const title = seo.titles[0];
				const description = seo.descriptions[0];
				expect(title.length, path).toBeLessThanOrEqual(60);
				expect(description.length, path).toBeLessThanOrEqual(155);
				expect(title, path).toContain(platform === 'x' ? 'X' : 'LinkedIn');
				expect(description, path).toContain(platform === 'x' ? 'X' : 'LinkedIn');
				expect(titles.has(title), `duplicate title: ${path}`).toBe(false);
				expect(descriptions.has(description), `duplicate description: ${path}`).toBe(false);
				expect(seo.h1, path).toHaveLength(1);
				expect(headings.has(seo.h1[0]), `duplicate H1: ${path}`).toBe(false);
				titles.add(title);
				descriptions.add(description);
				headings.add(seo.h1[0]);
				expect(seo.canonical, path).toEqual([`https://boldify.net${path}`]);
				expect(seo.alternates, path).toHaveLength(8);
				expect(seo.alternates, path).toContain(seo.canonical[0]);
				expect(seo.ogDescription, path).toBe(description);
				expect(seo.twitterDescription, path).toBe(description);
				expect(seo.imagesWithoutAlt, path).toEqual([]);
				for (let i = 1; i < seo.levels.length; i++) {
					expect(seo.levels[i], `skipped heading level: ${path}`).toBeLessThanOrEqual(
						seo.levels[i - 1] + 1
					);
				}
				expect(
					seo.schemas.some((schema) =>
						['SoftwareApplication', 'WebApplication'].includes(schema['@type'])
					),
					path
				).toBe(false);
				if (section === 'mcp') {
					const guide = seo.schemas.find((schema) => schema['@type'] === 'TechArticle');
					expect(guide?.url, path).toBe(seo.canonical[0]);
					expect(guide?.headline, path).toBe(seo.h1[0]);
					expect(guide?.inLanguage, path).toBe(language);
				}
			}
		}
	});
}

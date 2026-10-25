import { test, expect, type Page } from '@playwright/test';

import fr from '../src/locales/fr.json' with { type: 'json' };
import en from '../src/locales/en.json' with { type: 'json' };
import es from '../src/locales/es.json' with { type: 'json' };
import pt from '../src/locales/pt.json' with { type: 'json' };
import de from '../src/locales/de.json' with { type: 'json' };
import tr from '../src/locales/tr.json' with { type: 'json' };
import pl from '../src/locales/pl.json' with { type: 'json' };
const translations = { fr, en, es, pt, de, tr, pl };
const languages = ['fr', 'en', 'es', 'pt', 'de', 'tr', 'pl'] as const;
const xHome = (lang: string) => (lang === 'fr' ? '/x' : `/${lang}/x`);

const editor = (page: Page) => page.locator('#editor .ql-editor');
const livePreview = (page: Page) => page.locator('#text-preview').getByTestId('x-preview-text');
const counter = (page: Page) => page.getByTestId('post-counter');

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: {
				writeText: async (text: string) => {
					(window as unknown as { copied: string }).copied = text;
				}
			}
		});
	});
});

for (const lang of languages) {
	const route = xHome(lang);
	test(`direct static access and published metadata: ${route}`, async ({ page, request }) => {
		const response = await request.get(route);
		const html = await response.text();
		expect(html).toContain(translations[lang].introduction.title.replace(/LinkedIn/g, 'X'));
		expect(html).toContain(`rel="canonical" href="https://boldify.net${route}"`);
		expect(html).toContain('"@type":"WebPage"');
		expect(html).toContain('"datePublished":"2026-10-25"');
		expect(html).toContain('"dateModified":"2026-10-25"');
		await page.goto(route);
		await expect(page).toHaveTitle(translations[lang].x.title);
		await expect(editor(page)).toBeVisible();
		await expect(page.locator('link[rel="alternate"]')).toHaveCount(8);
		await expect(page.locator('.ql-underline')).toHaveCount(0);
		await expect(page.locator('.ql-overline')).toHaveCount(0);
		await expect(page.locator('.ql-list')).toHaveCount(2);
		await expect(page.locator('footer a[hreflang]')).toHaveCount(7);
	});
}

test('weighted limits remain visible during exact Unicode copy', async ({ page }) => {
	await page.goto('/en/x');
	for (const [length, state] of [
		[259, 'normal'],
		[260, 'warning'],
		[280, 'warning'],
		[281, 'over']
	] as const) {
		await editor(page).fill('a'.repeat(length));
		await expect(counter(page)).toHaveAttribute('data-state', state);
		await expect(counter(page)).toContainText(`${280 - length} units remaining`);
	}
	await page.getByRole('button', { name: 'Copy to clipboard' }).click();
	expect(await page.evaluate(() => (window as unknown as { copied: string }).copied)).toBe(
		'a'.repeat(281)
	);
	await expect(counter(page)).toHaveAttribute('data-state', 'over');
	const content = '𝗕𝗼𝗹𝗱 café cafe\u0301 👨‍👩‍👧‍👦 https://example.com/long/path #Boldify\n\n';
	await editor(page).fill(content);
	await expect(livePreview(page)).toHaveText(content);
	await page.getByRole('button', { name: 'Copy to clipboard' }).click();
	expect(await page.evaluate(() => (window as unknown as { copied: string }).copied)).toBe(content);
	await page.locator('.platform-switch a', { hasText: 'LinkedIn' }).click();
	await expect(editor(page)).toHaveText(content);
	await page.locator('.platform-switch a', { hasText: 'X' }).click();
	await page.getByRole('button', { name: 'Copy to clipboard' }).click();
	expect(await page.evaluate(() => (window as unknown as { copied: string }).copied)).toBe(content);
});

test('formats, counts and copies the transformed selection', async ({ page }) => {
	await page.goto('/en/x');
	await editor(page).fill('a'.repeat(140));
	await editor(page).press('ControlOrMeta+A');
	await page.getByRole('button', { name: 'bold', exact: true }).click();
	await expect(counter(page)).toContainText('0 units remaining');
	await expect(livePreview(page)).toHaveText('𝗮'.repeat(140));
	await editor(page).press('ArrowRight');
	await page.keyboard.type('a');
	await expect(counter(page)).toHaveAttribute('data-state', 'over');
	await editor(page).fill('hello');
	await editor(page).press('ControlOrMeta+A');
	await page.getByRole('button', { name: 'italic', exact: true }).click();
	await expect(livePreview(page)).toHaveText('𝘩𝘦𝘭𝘭𝘰');
	await editor(page).fill('hello');
	await editor(page).press('ControlOrMeta+A');
	await page.getByRole('button', { name: 'strike', exact: true }).click();
	await expect(livePreview(page)).toHaveText('h̶e̶l̶l̶o̶');
	await editor(page).fill('one\ntwo');
	await editor(page).press('ControlOrMeta+A');
	await page.getByRole('button', { name: 'bullet list', exact: true }).click();
	await expect(livePreview(page)).toContainText('• one\n• two');
	await editor(page).fill('one\ntwo');
	await editor(page).press('ControlOrMeta+A');
	await page.getByRole('button', { name: 'ordered list', exact: true }).click();
	await expect(livePreview(page)).toContainText('1. one\n2. two');
});

test('preserves edited and empty drafts across platforms and languages', async ({ page }) => {
	await page.goto('/');
	await editor(page).fill('Mon brouillon #safe <script>alert(1)</script>');
	await page.locator('.platform-switch a', { hasText: 'X' }).click();
	await expect(page).toHaveURL(/\/x$/);
	await expect(livePreview(page)).toContainText('<script>alert(1)</script>');
	await expect(livePreview(page).locator('script')).toHaveCount(0);
	await page.locator('footer a[hreflang="en"]').click();
	await expect(page).toHaveURL(/\/en\/x$/);
	await expect(editor(page)).toContainText('Mon brouillon');
	await page.locator('footer a[hreflang="fr"]').click();
	await expect(page).toHaveURL(/\/x$/);
	await expect(page.locator('h1')).toHaveText(fr.introduction.title.replace(/LinkedIn/g, 'X'));
	await page.locator('.platform-switch a', { hasText: 'LinkedIn' }).click();
	await expect(editor(page)).toContainText('Mon brouillon');
	await expect(page.locator('.ql-underline')).toBeVisible();
	await editor(page).fill('');
	await page.locator('.platform-switch a', { hasText: 'X' }).click();
	await expect(counter(page)).toContainText('280');
	await expect(livePreview(page)).toBeEmpty();
});

test('FR alias and sitemap expose only published X translations', async ({ page, request }) => {
	await page.goto('/fr/x');
	await expect(page).toHaveURL(/\/x$/);
	const sitemap = await (await request.get('/sitemap.xml')).text();
	expect(sitemap).toContain('<loc>https://boldify.net/x</loc>');
	expect(sitemap).toContain('<loc>https://boldify.net/en/x</loc>');
	expect(sitemap).not.toContain('<loc>https://boldify.net/fr/x</loc>');
	const xEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
		.map((match) => match[1])
		.filter((entry) => /<loc>https:\/\/boldify\.net\/(?:[a-z]{2}\/)?x(?:\/|<)/.test(entry));
	expect(xEntries).toHaveLength(35);
	for (const entry of xEntries) expect(entry).toContain('<lastmod>2026-10-25</lastmod>');
	for (const language of languages)
		expect(sitemap).toContain(`<loc>https://boldify.net${xHome(language)}</loc>`);
	for (const language of ['it', 'ja']) {
		const response = await request.get(`/${language}/x`);
		expect(response.status()).toBe(404);
	}
});

test('mobile switch, keyboard navigation and monochrome copy button', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('/en/x');
	const copy = page.getByRole('button', { name: 'Copy to clipboard' });
	await expect(copy).toHaveCSS('background-color', 'rgb(0, 0, 0)');
	await expect(copy).toHaveCSS('color', 'rgb(255, 255, 255)');
	await expect(page.locator('.platform-switch')).toBeVisible();
	await expect(page.locator('footer .btn-accent')).toHaveCSS(
		'background-color',
		'rgb(250, 204, 21)'
	);
	await expect(page.locator('body')).toHaveJSProperty('scrollWidth', 375);
	await page.locator('.platform-switch a', { hasText: 'LinkedIn' }).focus();
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(/\/en$/);
});

for (const language of languages) {
	const prefix = xHome(language);
	for (const section of ['about', 'how-it-works', 'help', 'mcp']) {
		test(`X secondary page is statically published: ${prefix}/${section}`, async ({
			page,
			request
		}) => {
			const path = `${prefix}/${section}`;
			const response = await request.get(path);
			expect(response.status()).toBe(200);
			const html = await response.text();
			expect(html).toContain(`rel="canonical" href="https://boldify.net${path}"`);
			expect(html).toContain('"datePublished":"2026-10-25"');
			expect(html).toContain('"dateModified":"2026-10-25"');
			await page.goto(path);
			await expect(page.locator('[data-platform="x"]')).toBeVisible();
			if (section !== 'about') {
				await expect(page.locator('main time[datetime="2026-10-25"]')).toHaveText('2026-10-25');
			}
			await expect(page.locator('h1')).toBeVisible();
			await expect(page.locator('link[rel="alternate"]')).toHaveCount(8);
			const internalLinks = await page
				.locator('nav.fixed ul a[href^="/"]')
				.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
			expect(internalLinks.length).toBeGreaterThan(0);
			expect(internalLinks.every((href) => href?.startsWith(prefix))).toBe(true);
			await expect(page.locator('nav.fixed a img')).toHaveCount(0);
			await expect(page.locator('nav.fixed')).not.toContainText('de Boldify');
		});
	}
}

for (const width of [375, 1440]) {
	test(`X navigation and switch keep the current section at ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await page.goto('/x');
		await editor(page).fill('Un brouillon à garder');
		if (width < 1280) await page.getByRole('button', { name: 'Toggle menu' }).click();
		await page.locator('nav.fixed ul:visible a[href="/x/how-it-works"]').click();
		await expect(page).toHaveURL(/\/x\/how-it-works$/);
		await expect(page.locator('[data-platform="x"]')).toBeVisible();
		await expect(page.locator('nav.fixed ul:visible a[aria-current="page"]')).toHaveCount(
			width < 1280 ? 0 : 1
		);
		await page.locator('footer a[hreflang="en"]').click();
		await expect(page).toHaveURL(/\/en\/x\/how-it-works$/);
		await expect(page.locator('h1')).toHaveText(
			en.how_it_works.hero_title.replace(/LinkedIn/g, 'X')
		);
		await page.locator('.platform-switch a', { hasText: 'LinkedIn' }).click();
		await expect(page).toHaveURL(/\/en\/how-it-works$/);
		await page.locator('.platform-switch a', { hasText: 'X' }).click();
		await expect(page).toHaveURL(/\/en\/x\/how-it-works$/);
		await page.locator('nav.fixed > div > div a').click();
		await expect(page).toHaveURL(/\/en\/x$/);
		await expect(editor(page)).toContainText('Un brouillon à garder');
		await expect(page.locator('#features')).toBeVisible();
		await expect(page.locator('#contribute')).toBeVisible();
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await expect(page.locator('.switch-indicator')).toHaveCSS('transition-duration', '0s');
	});
}

test('secondary French aliases redirect without publishing other locales', async ({
	page,
	request
}) => {
	for (const section of ['about', 'how-it-works', 'help', 'mcp']) {
		await page.goto(`/fr/x/${section}`);
		await expect(page).toHaveURL(new RegExp(`/x/${section}$`));
		expect((await request.get(`/it/x/${section}`)).status()).toBe(404);
	}
	const sitemap = await (await request.get('/sitemap.xml')).text();
	expect(sitemap).toContain('<loc>https://boldify.net/x/how-it-works</loc>');
	expect(sitemap).toContain('<loc>https://boldify.net/en/x/help</loc>');
	expect(sitemap).not.toContain('https://boldify.net/fr/x');
});

test('X help keeps the approved accordion interaction', async ({ page }) => {
	await page.goto('/x/help');
	const question = page.locator('button[aria-controls="faq-formatting-0"]');
	const answer = page.locator('#faq-formatting-0');
	await question.click();
	await expect(question).toHaveAttribute('aria-expanded', 'true');
	await expect(answer).toHaveCSS('opacity', '1');
	await question.click();
	await expect(answer).toHaveCSS('opacity', '0');
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await expect(answer).toHaveCSS('transition-duration', '0s');
});

test('all seven languages retain the X draft, section and platform', async ({ page }) => {
	test.setTimeout(60_000);
	await page.setViewportSize({ width: 375, height: 900 });
	await page.goto('/x');
	await editor(page).fill('Brouillon partagé : café 👨‍👩‍👧‍👦');
	for (const lang of languages) {
		// Locale changes alter page height; finish the current entrance/route animations
		// before scrolling to the next footer link.
		await page.evaluate(async () => {
			await document.fonts.ready;
			await Promise.all(
				document
					.getAnimations()
					.filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
					.map((animation) => animation.finished.catch(() => {}))
			);
		});
		await page.locator(`footer a[hreflang="${lang}"]`).click();
		await expect(page).toHaveURL(new RegExp(`${xHome(lang)}$`));
		await expect(page.locator('h1')).toHaveText(
			translations[lang].introduction.title.replace(/LinkedIn/g, 'X')
		);
		await expect(editor(page)).toContainText('Brouillon partagé');
		await expect(page.locator('.platform-switch a', { hasText: 'LinkedIn' })).toHaveAttribute(
			'href',
			lang === 'fr' ? '/' : `/${lang}`
		);
		await expect(page.locator(`a[href="${xHome(lang)}/how-it-works"]`).first()).toBeAttached();
	}
	await page.goto('/x/help');
	for (const lang of languages) {
		// Locale changes alter page height; finish the current entrance/route animations
		// before scrolling to the next footer link.
		await page.evaluate(async () => {
			await document.fonts.ready;
			await Promise.all(
				document
					.getAnimations()
					.filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
					.map((animation) => animation.finished.catch(() => {}))
			);
		});
		await page.locator(`footer a[hreflang="${lang}"]`).click();
		await expect(page).toHaveURL(new RegExp(`${xHome(lang)}/help$`));
		await expect(page.locator('h1')).toHaveText(
			translations[lang].help.hero_title.replace(/LinkedIn/g, 'X')
		);
		await expect(page.locator('button[aria-controls="faq-formatting-0"]')).toHaveText(
			translations[lang].help.formatting_q1
		);
		await expect(page.locator('html')).toHaveAttribute('lang', lang);
	}
});

for (const width of [375, 1440]) {
	for (const section of ['', 'about', 'how-it-works', 'help', 'mcp']) {
		test(`X reuses the LinkedIn page composition for ${section || 'home'} at ${width}px`, async ({
			page
		}) => {
			await page.setViewportSize({ width, height: 900 });
			const composition = async () =>
				page.locator('section').evaluateAll((sections) =>
					sections.map((section) => ({
						classes: section.className,
						headings: [...section.querySelectorAll('h1,h2,h3')].map((heading) => heading.tagName)
					}))
				);
			await page.goto(section ? `/fr/${section}` : '/');
			const linkedin = await composition();
			await page.goto(section ? `/x/${section}` : '/x');
			expect(await composition()).toEqual(linkedin);
			await expect(page.locator('body')).toHaveJSProperty('scrollWidth', width);
			await expect(page.locator('footer .btn-accent')).toHaveCSS(
				'background-color',
				'rgb(250, 204, 21)'
			);
		});
	}
}

test('X keeps the shared FAQ and MCP functions with platform-specific content', async ({
	page
}) => {
	await page.goto('/en/x/help');
	await page.locator('button[data-category="linkedin"]:visible').click();
	const question = page.locator('button[aria-controls="faq-linkedin-0"]');
	await expect(question).toHaveText(en.x.counting_question);
	await question.click();
	await expect(page.locator('#faq-linkedin-0')).toContainText(en.x.counting_explanation);
	await page.goto('/en/x/mcp');
	const command = page.getByRole('button', { name: 'Copy install command' });
	// The shared MCP page retains both HTTP configuration and local installation sections.
	await expect(page.locator('main pre')).not.toHaveCount(0);
	await expect(page.locator('main')).toContainText('https://api.boldify.net/mcp');
	await expect(command).toHaveCount(1);
	await command.click();
	expect(await page.evaluate(() => (window as unknown as { copied: string }).copied)).toContain(
		'boldify-mcp/main/scripts/install.sh'
	);
});

for (const width of [375, 1440]) {
	test(`tweet preview follows the X layout at ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 1000 });
		await page.goto('/en/x');
		const preview = page.locator('#text-preview').getByTestId('x-preview');
		await expect(preview.getByRole('img', { name: 'Bookmark', exact: true })).toBeVisible();
		await expect(preview.getByRole('img', { name: 'Share post', exact: true })).toBeVisible();
		await expect(preview.locator('.action')).toHaveCount(6);
		await editor(page).fill('𝗕𝗼𝗹𝗱 #Boldify\n' + 'x'.repeat(300));
		await expect(livePreview(page)).toHaveText('𝗕𝗼𝗹𝗱 #Boldify\n' + 'x'.repeat(300));
		const geometry = await preview.evaluate((post) => {
			const rect = (selector: string) => post.querySelector(selector)!.getBoundingClientRect();
			return {
				textLeft: rect('.post-text').left,
				identityLeft: rect('.identity').left,
				actionsLeft: rect('.actions').left,
				avatarRight: rect('.avatar').right,
				actionOverflow:
					post.querySelector('.actions')!.scrollWidth > post.querySelector('.actions')!.clientWidth,
				pageOverflow: document.documentElement.scrollWidth > window.innerWidth,
				textOverflow:
					post.querySelector('.post-text')!.scrollWidth >
					post.querySelector('.post-text')!.clientWidth
			};
		});
		expect(geometry.textLeft).toBe(geometry.identityLeft);
		expect(geometry.actionsLeft).toBe(geometry.textLeft);
		expect(geometry.textLeft).toBeGreaterThan(geometry.avatarRight);
		expect(geometry.actionOverflow).toBe(false);
		expect(geometry.textOverflow).toBe(false);
		expect(geometry.pageOverflow).toBe(false);
	});
}

for (const width of [375, 1440]) {
	test(`X illustrations and MCP panels keep their theme and contrast at ${width}px`, async ({
		page
	}) => {
		await page.setViewportSize({ width, height: 1000 });
		for (const section of ['about', 'how-it-works']) {
			await page.goto(`/x/${section}`);
			const illustrations = page.locator('main img.platform-illustration');
			expect(await illustrations.count()).toBeGreaterThan(0);
			for (const image of await illustrations.all()) {
				await expect(image).toHaveCSS('filter', 'grayscale(1)');
			}
		}
		const contrasts = await page.evaluate(() => {
			const luminance = (rgb: number[]) =>
				rgb
					.map((value) => {
						const channel = value / 255;
						return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
					})
					.reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
			const contrast = (element: Element, background: number[]) => {
				const foreground = getComputedStyle(element)
					.color.match(/[\d.]+/g)!
					.slice(0, 3)
					.map(Number);
				const light = luminance(foreground);
				const dark = luminance(background);
				return (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05);
			};
			return {
				dark: [...document.querySelectorAll('.text-mcp-on-dark')].map((element) =>
					contrast(element, [0, 0, 0])
				),
				light: [
					...document.querySelectorAll('.code-sample-light pre span, .code-sample-light .font-mono')
				].map((element) => contrast(element, [255, 255, 255]))
			};
		});
		expect(contrasts.dark.length).toBeGreaterThan(0);
		expect(contrasts.light.length).toBeGreaterThan(0);
		for (const ratio of [...contrasts.dark, ...contrasts.light])
			expect(ratio).toBeGreaterThanOrEqual(4.5);
		await page.goto('/fr/about');
		for (const image of await page.locator('main img.platform-illustration').all()) {
			await expect(image).toHaveCSS('filter', 'none');
		}
	});
}

test('X preview actions animate with the native engagement hover colors', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto('/en/x');
	await expect(editor(page)).toBeVisible();
	await expect(livePreview(page)).toHaveText(en.x.default_text);
	await page.evaluate(async () => {
		await document.fonts.ready;
		await Promise.all(
			document
				.getAnimations()
				.filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
				.map((animation) => animation.finished.catch(() => {}))
		);
	});
	const preview = page.locator('#text-preview').getByTestId('x-preview');
	const actions = preview.locator('.action');
	const colors = [
		'rgb(29, 155, 240)',
		'rgb(0, 186, 124)',
		'rgb(249, 24, 128)',
		'rgb(29, 155, 240)',
		'rgb(29, 155, 240)',
		'rgb(29, 155, 240)'
	];
	const counts = await actions.allTextContents();
	for (const [index, color] of colors.entries()) {
		const action = actions.nth(index);
		await expect(action).toHaveCSS('cursor', 'pointer');
		await action.hover();
		await expect(action).toHaveCSS('color', color);
		await expect
			.poll(() => action.evaluate((element) => getComputedStyle(element, '::before').opacity))
			.toBe('1');
		expect(
			await action.evaluate((element) => getComputedStyle(element, '::before').transform)
		).toBe('matrix(1, 0, 0, 1, 0, 0)');
		const tint = await action.evaluate((element) => {
			const canvas = document.createElement('canvas');
			canvas.width = canvas.height = 1;
			const context = canvas.getContext('2d')!;
			context.fillStyle = getComputedStyle(element, '::before').backgroundColor;
			context.fillRect(0, 0, 1, 1);
			return [...context.getImageData(0, 0, 1, 1).data];
		});
		expect(tint[3]).toBeGreaterThanOrEqual(25);
		expect(tint[3]).toBeLessThanOrEqual(26);
		await preview.locator('.post-text').hover();
		await expect(action).toHaveCSS('color', 'rgb(83, 100, 113)');
		await expect
			.poll(() => action.evaluate((element) => getComputedStyle(element, '::before').opacity))
			.toBe('0');
	}
	expect(await actions.allTextContents()).toEqual(counts);
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await expect(actions.first()).toHaveCSS('transition-duration', '0s');
	expect(
		await actions
			.first()
			.evaluate((element) => getComputedStyle(element, '::before').transitionDuration)
	).toBe('0s');
});

import { test, expect } from '@playwright/test';

const ZWSP = '​';

// Lit le texte copié, de façon fiable sur tous les navigateurs :
// - chromium : vrai presse-papiers (permissions accordées)
// - firefox/webkit : valeur interceptée via addInitScript (pas de permission clipboard)
const readClipboard = (
	page: import('@playwright/test').Page,
	testInfo: { project: { name: string } }
) =>
	testInfo.project.name === 'chromium'
		? page.evaluate(() => navigator.clipboard.readText())
		: page.evaluate(() => (window as unknown as { __copied: string }).__copied);

// Colle `text` en remplaçant tout le contenu de l'éditeur (y compris le texte par défaut).
// Le collage est inséré à la sélection courante : on sélectionne donc tout le document Quill
// d'abord pour que le texte collé remplace le texte par défaut.
const pasteReplacingAll = async (page: import('@playwright/test').Page, text: string) => {
	await page.locator('#editor .ql-editor').click();
	await page.locator('#editor .ql-editor').press('Control+a');
	// ClipboardEvent constructor doesn't carry clipboardData on Firefox/WebKit,
	// so we build a plain Event and define clipboardData on it (works everywhere).
	await page.evaluate((t) => {
		const evt = new Event('paste', { bubbles: true, cancelable: true });
		Object.defineProperty(evt, 'clipboardData', {
			value: { getData: (type: string) => (type === 'text/plain' ? t : '') }
		});
		document.querySelector('#editor .ql-editor')!.dispatchEvent(evt);
	}, text);
	await page.waitForTimeout(300);
};

test.describe('LinkedIn empty-line fix', () => {
	// Firefox and WebKit don't support clipboard-read/clipboard-write permissions.
	// On those browsers we intercept navigator.clipboard via addInitScript instead.
	test.beforeEach(async ({ page }, testInfo) => {
		if (testInfo.project.name !== 'chromium') {
			await page.addInitScript(() => {
				Object.defineProperty(window, '__copied', {
					configurable: true,
					writable: true,
					value: ''
				});
				const w = window as unknown as { __copied: string };
				Object.defineProperty(navigator, 'clipboard', {
					configurable: true,
					value: {
						writeText: async (text: string) => {
							w.__copied = text;
						},
						readText: async () => w.__copied
					}
				});
			});
		}

		await page.goto('/');
		await page.waitForSelector('#editor .ql-editor', { state: 'visible' });
		await page.waitForFunction(() => {
			const editor = document.querySelector('#editor .ql-editor');
			return editor && editor.textContent && editor.textContent.length > 0;
		});
		// Reset the intercepted clipboard value (fresh page load)
		if (testInfo.project.name !== 'chromium') {
			await page.evaluate(() => {
				(window as unknown as { __copied: string }).__copied = '';
			});
		}
	});

	test('copier un post multi-paragraphes met un zero-width space sur les lignes vides', async ({
		page,
		context
	}, testInfo) => {
		if (testInfo.project.name === 'chromium') {
			await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		}
		await pasteReplacingAll(page, 'Premier paragraphe\n\nDeuxième paragraphe\nTroisième ligne');

		await page.getByRole('button', { name: /copy to clipboard/i }).click();
		await page.waitForTimeout(200);

		const clipboard = await readClipboard(page, testInfo);
		// Le presse-papiers doit contenir le texte avec un ZWSP sur la ligne vide
		expect(clipboard).toContain(`Premier paragraphe\n${ZWSP}\nDeuxième paragraphe`);
		// Et toujours les sauts de ligne
		expect(clipboard).toContain('Troisième ligne');
	});

	test('le formatage Unicode est préservé dans le texte copié', async ({
		page,
		context
	}, testInfo) => {
		if (testInfo.project.name === 'chromium') {
			await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		}
		// Remplacer le contenu par défaut par un texte simple avec un paragraphe vide
		await pasteReplacingAll(page, 'Texte en gras\n\nDeuxième paragraphe');
		// Sélectionner tout et mettre en gras
		await page.locator('#editor .ql-editor').press('Control+a');
		await page.locator('#toolbar .ql-bold').click();
		await page.waitForTimeout(300);

		await page.getByRole('button', { name: /copy to clipboard/i }).click();
		await page.waitForTimeout(200);

		const clipboard = await readClipboard(page, testInfo);
		// Le texte en gras contient des caractères mathématiques (𝗧 = U+1D5E7 pour "Texte")
		expect(clipboard).toContain('𝗧');
		// La ligne vide entre les paragraphes a un ZWSP
		expect(clipboard).toContain(`\n${ZWSP}\n`);
	});

	test('un texte sans ligne vide est copié tel quel (pas de double saut de ligne)', async ({
		page,
		context
	}, testInfo) => {
		if (testInfo.project.name === 'chromium') {
			await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		}
		await pasteReplacingAll(page, 'Ligne un\nLigne deux');

		await page.getByRole('button', { name: /copy to clipboard/i }).click();
		await page.waitForTimeout(200);

		const clipboard = await readClipboard(page, testInfo);
		// Quill ajoute un saut de ligne final : la "ligne vide" terminale reçoit un ZWSP.
		// C'est attendu — on vérifie surtout qu'aucune ligne vide INTERNE n'apparaît sans ZWSP.
		expect(clipboard.startsWith('Ligne un\nLigne deux')).toBe(true);
		expect(clipboard).not.toContain('\n\n');
	});
});

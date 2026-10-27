import { test, expect } from '@playwright/test';

const ZWSP = '​';

// Colle `text` en remplaçant tout le contenu de l'éditeur (y compris le texte par défaut).
// Le collage est inséré à la sélection courante : on sélectionne donc tout le document Quill
// d'abord pour que le texte collé remplace le texte par défaut.
const pasteReplacingAll = async (page: import('@playwright/test').Page, text: string) => {
	await page.locator('#editor .ql-editor').click();
	await page.locator('#editor .ql-editor').press('Control+a');
	await page.evaluate((t) => {
		const dt = new DataTransfer();
		dt.setData('text/plain', t);
		document
			.querySelector('#editor .ql-editor')!
			.dispatchEvent(
				new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true })
			);
	}, text);
	await page.waitForTimeout(300);
};

test.describe('LinkedIn empty-line fix', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('#editor .ql-editor', { state: 'visible' });
		await page.waitForFunction(() => {
			const editor = document.querySelector('#editor .ql-editor');
			return editor && editor.textContent && editor.textContent.length > 0;
		});
	});

	test('copier un post multi-paragraphes met un zero-width space sur les lignes vides', async ({
		page,
		context
	}) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		await pasteReplacingAll(page, 'Premier paragraphe\n\nDeuxième paragraphe\nTroisième ligne');

		await page.getByRole('button', { name: /copy to clipboard/i }).click();
		await page.waitForTimeout(200);

		const clipboard = await page.evaluate(() => navigator.clipboard.readText());
		// Le presse-papiers doit contenir le texte avec un ZWSP sur la ligne vide
		expect(clipboard).toContain(`Premier paragraphe\n${ZWSP}\nDeuxième paragraphe`);
		// Et toujours les sauts de ligne
		expect(clipboard).toContain('Troisième ligne');
	});

	test('le formatage Unicode est préservé dans le texte copié', async ({ page, context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		// Remplacer le contenu par défaut par un texte simple avec un paragraphe vide
		await pasteReplacingAll(page, 'Texte en gras\n\nDeuxième paragraphe');
		// Sélectionner tout et mettre en gras
		await page.locator('#editor .ql-editor').press('Control+a');
		await page.locator('#toolbar .ql-bold').click();
		await page.waitForTimeout(300);

		await page.getByRole('button', { name: /copy to clipboard/i }).click();
		await page.waitForTimeout(200);

		const clipboard = await page.evaluate(() => navigator.clipboard.readText());
		// Le texte en gras contient des caractères mathématiques (𝗧 = U+1D5E7 pour "Texte")
		expect(clipboard).toContain('𝗧');
		// La ligne vide entre les paragraphes a un ZWSP
		expect(clipboard).toContain(`\n${ZWSP}\n`);
	});

	test('un texte sans ligne vide est copié tel quel (pas de double saut de ligne)', async ({
		page,
		context
	}) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		await pasteReplacingAll(page, 'Ligne un\nLigne deux');

		await page.getByRole('button', { name: /copy to clipboard/i }).click();
		await page.waitForTimeout(200);

		const clipboard = await page.evaluate(() => navigator.clipboard.readText());
		// Quill ajoute un saut de ligne final : la "ligne vide" terminale reçoit un ZWSP.
		// C'est attendu — on vérifie surtout qu'aucune ligne vide INTERNE n'apparaît sans ZWSP.
		expect(clipboard.startsWith('Ligne un\nLigne deux')).toBe(true);
		expect(clipboard).not.toContain('\n\n');
	});
});

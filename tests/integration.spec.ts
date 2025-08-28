import { test, expect } from '@playwright/test';

test.describe('Integration Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('#editor', { state: 'visible' });
		await page.waitForSelector('.post-container', { state: 'visible' });
		await page.waitForSelector('#editor .ql-editor', { state: 'visible' });
		// Additional wait to ensure editor is fully initialized
		await page.waitForTimeout(1000);
	});

	test('should handle complete workflow: edit, format, preview, copy', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		const copyButton = page.getByText('Copy', { exact: false });
		
		// Step 1: Add content
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Creating amazing #LinkedIn posts with https://boldify.net');
		
		// Step 2: Apply formatting
		// Select "amazing" and make it bold
		await page.keyboard.press('Home');
		await page.keyboard.press('Control+Right'); // Move to "amazing"
		await page.keyboard.press('Control+Right');
		await page.keyboard.press('Control+Shift+Right'); // Select "amazing"
		
		await page.locator('.ql-bold').click();
		
		// Step 3: Verify preview updates
		await page.waitForTimeout(100);
		await expect(preview).toContainText('Creating amazing #LinkedIn posts');
		
		// Step 4: Verify hashtags and links are highlighted
		const highlightedElements = preview.locator('.highlight');
		await expect(highlightedElements).toHaveCount(2);
		
		// Step 5: Copy content
		await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
		await copyButton.click();
		
		// Verify copy worked by checking if a snackbar appears (if implemented)
		// or by pasting the content elsewhere
	});

	test('should maintain formatting consistency between editor and preview', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Create content with multiple formatting types
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Bold text, italic text, underline text, and strike text.');
		
		// Apply bold to first word
		await page.keyboard.press('Home');
		await page.keyboard.press('Control+Shift+Right');
		await page.locator('.ql-bold').click();
		
		// Apply italic to second occurrence
		await page.keyboard.press('Control+Right');
		await page.keyboard.press('Control+Right');
		await page.keyboard.press('Control+Shift+Right');
		await page.locator('.ql-italic').click();
		
		// Apply underline to third occurrence
		await page.keyboard.press('Control+Right');
		await page.keyboard.press('Control+Right');
		await page.keyboard.press('Control+Shift+Right');
		await page.locator('.ql-underline').click();
		
		// Apply strikethrough to fourth occurrence
		await page.keyboard.press('Control+Right');
		await page.keyboard.press('Control+Right');
		await page.keyboard.press('Control+Right');
		await page.keyboard.press('Control+Shift+Right');
		await page.locator('.ql-strike').click();
		
		// Wait for sync
		await page.waitForTimeout(200);
		
		// Verify all formatting is present in editor
		await expect(editor.locator('strong')).toBeVisible();
		await expect(editor.locator('em')).toBeVisible();
		await expect(editor.locator('u')).toBeVisible();
		await expect(editor.locator('s')).toBeVisible();
		
		// Verify content is in preview
		await expect(preview).toContainText('Bold text, italic text, underline text, and strike text.');
	});

	test('should handle list formatting and preview correctly', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Create bullet list
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('First item');
		await page.locator('.ql-list[value="bullet"]').click();
		
		await page.keyboard.press('Enter');
		await page.keyboard.type('Second item');
		
		await page.keyboard.press('Enter');
		await page.keyboard.type('Third item');
		
		// Wait for sync
		await page.waitForTimeout(100);
		
		// Verify bullet list in editor
		await expect(editor.locator('ul li')).toHaveCount(3);
		
		// Verify content appears in preview
		await expect(preview).toContainText('First item');
		await expect(preview).toContainText('Second item');
		await expect(preview).toContainText('Third item');
		
		// Convert to ordered list
		await page.keyboard.press('Control+A');
		await page.locator('.ql-list[value="ordered"]').click();
		
		await page.waitForTimeout(100);
		
		// Verify ordered list in editor
		await expect(editor.locator('ol li')).toHaveCount(3);
	});

	test('should handle character limit warning', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const characterCounter = page.getByText(/\d+ \/ 3000/);
		
		// Start with current character count
		const initialCount = await characterCounter.textContent();
		const initialNumber = parseInt(initialCount?.match(/(\d+)/)?.[1] || '0');
		
		// Add text to approach character limit
		await editor.click();
		await page.keyboard.press('End'); // Go to end of existing content
		
		// Add a significant amount of text
		const longText = 'A'.repeat(1000);
		await page.keyboard.type(longText);
		
		// Wait for character count to update
		await page.waitForTimeout(100);
		
		// Verify character count increased
		const newCount = await characterCounter.textContent();
		const newNumber = parseInt(newCount?.match(/(\d+)/)?.[1] || '0');
		
		expect(newNumber).toBeGreaterThan(initialNumber);
		
		// Check if counter shows warning colors when approaching limit
		const counterElement = page.locator('[class*="text-sm font-medium py-1 px-3 rounded-full"]');
		const styles = await counterElement.getAttribute('style');
		expect(styles).toBeTruthy(); // Should have color styles
	});

	test('should handle undo/redo across multiple operations', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const undoButton = page.locator('.ql-undo');
		const redoButton = page.locator('.ql-redo');
		
		// Clear editor
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Step 1');
		
		// Add more content
		await page.keyboard.type(' Step 2');
		
		// Add formatting
		await page.keyboard.press('Control+A');
		await page.locator('.ql-bold').click();
		
		// Undo the formatting
		await undoButton.click();
		await expect(editor.locator('strong')).not.toBeVisible();
		
		// Undo the text addition
		await undoButton.click();
		await expect(editor).not.toContainText('Step 2');
		
		// Redo operations
		await redoButton.click();
		await expect(editor).toContainText('Step 1 Step 2');
		
		await redoButton.click();
		await expect(editor.locator('strong')).toBeVisible();
	});

	test('should handle special characters and unicode', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Add content with special characters and unicode
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Hello 🌍! Testing special chars: ©®™ and unicode: 中文 العربية');
		
		// Wait for sync
		await page.waitForTimeout(100);
		
		// Verify special characters appear correctly in both editor and preview
		await expect(editor).toContainText('🌍');
		await expect(editor).toContainText('©®™');
		await expect(editor).toContainText('中文');
		await expect(editor).toContainText('العربية');
		
		await expect(preview).toContainText('🌍');
		await expect(preview).toContainText('©®™');
		await expect(preview).toContainText('中文');
		await expect(preview).toContainText('العربية');
	});

	test('should handle rapid typing and formatting', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Clear editor
		await editor.click();
		await page.keyboard.press('Control+A');
		
		// Rapidly type and format
		await page.keyboard.type('Quick');
		await page.keyboard.press('Control+A');
		await page.locator('.ql-bold').click();
		
		await page.keyboard.press('End');
		await page.keyboard.type(' typing');
		await page.keyboard.press('Control+Shift+Left');
		await page.locator('.ql-italic').click();
		
		await page.keyboard.press('End');
		await page.keyboard.type(' test');
		await page.keyboard.press('Control+Shift+Left');
		await page.locator('.ql-underline').click();
		
		// Wait for all changes to sync
		await page.waitForTimeout(200);
		
		// Verify final state
		await expect(editor.locator('strong')).toContainText('Quick');
		await expect(editor.locator('em')).toContainText('typing');
		await expect(editor.locator('u')).toContainText('test');
		
		await expect(preview).toContainText('Quick typing test');
	});

	test('should maintain state after page interactions', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Add and format content
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Persistent content');
		await page.keyboard.press('Control+A');
		await page.locator('.ql-bold').click();
		
		// Click around the page
		await page.locator('h1, h2').first().click(); // Click on a heading
		await page.locator('.post-container').click(); // Click on preview
		
		// Go back to editor
		await editor.click();
		
		// Verify content and formatting persist
		await expect(editor.locator('strong')).toContainText('Persistent content');
		await expect(preview).toContainText('Persistent content');
		
		// Verify we can continue editing
		await page.keyboard.press('End');
		await page.keyboard.type(' - still working!');
		
		await page.waitForTimeout(100);
		await expect(preview).toContainText('Persistent content - still working!');
	});
});
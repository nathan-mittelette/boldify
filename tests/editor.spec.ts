import { test, expect } from '@playwright/test';

test.describe('Text Editor', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		// Wait for the editor to be loaded and accessible
		await page.waitForSelector('#editor', { state: 'visible' });
		// Wait for the Quill editor content to be available
		await page.waitForSelector('#editor .ql-editor', { state: 'visible' });
		// Additional wait to ensure editor is fully initialized
		await page.waitForTimeout(1000);
	});

	test('should load editor with default text', async ({ page }) => {
		// Check if the editor is visible
		await expect(page.locator('#editor')).toBeVisible();
		
		// Check if toolbar is visible
		await expect(page.locator('#toolbar')).toBeVisible();
		
		// Check if editor contains some default text (might be localized)
		const editorContent = page.locator('#editor .ql-editor');
		await expect(editorContent).not.toBeEmpty();
	});

	test('should have all formatting buttons in toolbar', async ({ page }) => {
		// Check undo/redo buttons
		await expect(page.locator('.ql-undo')).toBeVisible();
		await expect(page.locator('.ql-redo')).toBeVisible();
		
		// Check formatting buttons
		await expect(page.locator('.ql-bold')).toBeVisible();
		await expect(page.locator('.ql-italic')).toBeVisible();
		await expect(page.locator('.ql-underline')).toBeVisible();
		await expect(page.locator('.ql-strike')).toBeVisible();
		await expect(page.locator('.ql-overline')).toBeVisible();
		
		// Check list buttons
		await expect(page.locator('.ql-list[value="ordered"]')).toBeVisible();
		await expect(page.locator('.ql-list[value="bullet"]')).toBeVisible();
	});

	test('should apply bold formatting when clicking bold button', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const boldButton = page.locator('.ql-bold');
		const preview = page.locator('.text-container pre').first();
		
		// Clear editor completely and add simple test text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.press('Delete');
		await page.keyboard.type('Test bold');
		
		// Select the text
		await page.keyboard.press('Control+A');
		
		// Store original content for comparison
		const originalContent = await editor.textContent();
		
		// Click bold button
		await boldButton.click();
		
		// Wait for formatting to be applied
		await page.waitForTimeout(500);
		
		// Check if the text content has changed (indicating formatting was applied)
		const newContent = await editor.textContent();
		expect(newContent).not.toBe(originalContent);
		
		// Check if preview is updated
		const previewContent = await preview.textContent();
		expect(previewContent).toBeTruthy();
	});

	test('should apply italic formatting when clicking italic button', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const italicButton = page.locator('.ql-italic');
		
		// Clear editor and add test text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Test italic text');
		
		// Select the text
		await page.keyboard.press('Control+A');
		
		// Click italic button
		await italicButton.click();
		
		// Check if italic button is active
		await expect(italicButton).toHaveClass(/ql-active/);
		
		// Check if text is wrapped in italic tags
		const italicContent = editor.locator('em');
		await expect(italicContent).toBeVisible();
		await expect(italicContent).toContainText('Test italic text');
	});

	test('should apply underline formatting when clicking underline button', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const underlineButton = page.locator('.ql-underline');
		
		// Clear editor and add test text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Test underline text');
		
		// Select the text
		await page.keyboard.press('Control+A');
		
		// Click underline button
		await underlineButton.click();
		
		// Check if underline button is active
		await expect(underlineButton).toHaveClass(/ql-active/);
		
		// Check if text is wrapped in underline tags
		const underlineContent = editor.locator('u');
		await expect(underlineContent).toBeVisible();
		await expect(underlineContent).toContainText('Test underline text');
	});

	test('should apply strikethrough formatting when clicking strike button', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const strikeButton = page.locator('.ql-strike');
		
		// Clear editor and add test text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Test strike text');
		
		// Select the text
		await page.keyboard.press('Control+A');
		
		// Click strike button
		await strikeButton.click();
		
		// Check if strike button is active
		await expect(strikeButton).toHaveClass(/ql-active/);
		
		// Check if text is wrapped in strike tags
		const strikeContent = editor.locator('s');
		await expect(strikeContent).toBeVisible();
		await expect(strikeContent).toContainText('Test strike text');
	});

	test('should apply ordered list when clicking ordered list button', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const orderedListButton = page.locator('.ql-list[value="ordered"]');
		
		// Clear editor and add test text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('First item');
		
		// Click ordered list button
		await orderedListButton.click();
		
		// Check if ordered list button is active
		await expect(orderedListButton).toHaveClass(/ql-active/);
		
		// Check if ordered list is created
		const orderedList = editor.locator('ol');
		await expect(orderedList).toBeVisible();
		
		const listItem = editor.locator('ol li');
		await expect(listItem).toBeVisible();
		await expect(listItem).toContainText('First item');
	});

	test('should apply bullet list when clicking bullet list button', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const bulletListButton = page.locator('.ql-list[value="bullet"]');
		
		// Clear editor and add test text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('First item');
		
		// Click bullet list button
		await bulletListButton.click();
		
		// Check if bullet list button is active
		await expect(bulletListButton).toHaveClass(/ql-active/);
		
		// Check if bullet list is created
		const bulletList = editor.locator('ul');
		await expect(bulletList).toBeVisible();
		
		const listItem = editor.locator('ul li');
		await expect(listItem).toBeVisible();
		await expect(listItem).toContainText('First item');
	});

	test('should show character count', async ({ page }) => {
		// Check if character counter is visible
		const characterCounter = page.getByText(/\d+ \/ 3000/);
		await expect(characterCounter).toBeVisible();
	});

	test('should copy text to clipboard when clicking copy button', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const copyButton = page.getByText('Copy', { exact: false });
		
		// Add test text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Test copy text');
		
		// Grant clipboard permissions
		await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
		
		// Click copy button
		await copyButton.click();
		
		// Verify text was copied by pasting in a different location
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.press('Control+V');
		
		// Check if the pasted text matches
		await expect(editor).toContainText('Test copy text');
	});

	test('should update text store when editor content changes', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		
		// Add test text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('New test content');
		
		// Wait a bit for the store to update
		await page.waitForTimeout(100);
		
		// Check if preview is updated (this indirectly tests if the store is updated)
		const preview = page.locator('.text-container pre').first();
		await expect(preview).toContainText('New test content');
	});

	test('should handle undo functionality', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const undoButton = page.locator('.ql-undo');
		
		// Clear editor and add initial text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Initial text');
		
		// Add more text
		await page.keyboard.type(' Additional text');
		
		// Click undo button
		await undoButton.click();
		
		// Check if the last change was undone
		await expect(editor).toContainText('Initial text');
		await expect(editor).not.toContainText('Additional text');
	});

	test('should handle redo functionality', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const undoButton = page.locator('.ql-undo');
		const redoButton = page.locator('.ql-redo');
		
		// Clear editor and add text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Test text');
		
		// Add more text
		await page.keyboard.type(' More text');
		
		// Undo the last change
		await undoButton.click();
		
		// Redo the change
		await redoButton.click();
		
		// Check if the change was redone
		await expect(editor).toContainText('Test text More text');
	});
});
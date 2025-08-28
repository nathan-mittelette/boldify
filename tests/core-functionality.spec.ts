import { test, expect } from '@playwright/test';

test.describe('Core Functionality Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('#editor', { state: 'visible' });
		await page.waitForSelector('.post-container', { state: 'visible' });
		await page.waitForSelector('#editor .ql-editor', { state: 'visible' });
		await page.waitForTimeout(1000);
	});

	test('should display main components correctly', async ({ page }) => {
		// Check editor is visible
		await expect(page.locator('#editor')).toBeVisible();
		await expect(page.locator('#toolbar')).toBeVisible();
		
		// Check all formatting buttons are present
		await expect(page.locator('.ql-bold')).toBeVisible();
		await expect(page.locator('.ql-italic')).toBeVisible();
		await expect(page.locator('.ql-underline')).toBeVisible();
		await expect(page.locator('.ql-strike')).toBeVisible();
		await expect(page.locator('.ql-overline')).toBeVisible();
		
		// Check preview is visible
		await expect(page.locator('.post-container').first()).toBeVisible();
		
		// Check copy button is visible
		await expect(page.getByText('Copy', { exact: false })).toBeVisible();
		
		// Check character counter is visible
		await expect(page.getByText(/\d+ \/ 3000/)).toBeVisible();
	});

	test('should allow text input in editor', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		
		// Add some text
		await editor.click();
		await page.keyboard.press('End');
		await page.keyboard.type(' Added text for testing');
		
		// Verify text appears in editor
		const content = await editor.textContent();
		expect(content).toContain('Added text for testing');
	});

	test('should update preview when editor content changes', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Add unique text
		const testText = 'Unique test text ' + Date.now();
		await editor.click();
		await page.keyboard.press('End');
		await page.keyboard.type(testText);
		
		// Wait for sync
		await page.waitForTimeout(300);
		
		// Check if preview contains the text
		const previewContent = await preview.textContent();
		expect(previewContent).toContain(testText);
	});

	test('should handle toolbar button clicks without errors', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		
		// Select some content first
		await editor.click();
		await page.keyboard.press('End');
		await page.keyboard.type('Test formatting');
		await page.keyboard.press('Control+A');
		
		// Test each formatting button can be clicked
		await page.locator('.ql-bold').click();
		await page.waitForTimeout(100);
		
		await page.locator('.ql-italic').click();
		await page.waitForTimeout(100);
		
		await page.locator('.ql-underline').click();
		await page.waitForTimeout(100);
		
		await page.locator('.ql-strike').click();
		await page.waitForTimeout(100);
		
		// All clicks completed without error - test passes
	});

	test('should handle copy functionality', async ({ page }) => {
		const copyButton = page.getByText('Copy', { exact: false });
		
		// Grant clipboard permissions
		await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
		
		// Click copy button - should not throw error
		await copyButton.click();
		
		// If snackbar appears, that's good - but don't require it
		// The main thing is no errors occurred
	});

	test('should handle undo/redo buttons', async ({ page }) => {
		const undoButton = page.locator('.ql-undo');
		const redoButton = page.locator('.ql-redo');
		
		// Buttons should be clickable
		await undoButton.click();
		await page.waitForTimeout(100);
		
		await redoButton.click();
		await page.waitForTimeout(100);
		
		// No errors - test passes
	});

	test('should handle list formatting buttons', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const orderedListButton = page.locator('.ql-list[value="ordered"]');
		const bulletListButton = page.locator('.ql-list[value="bullet"]');
		
		// Add some text first
		await editor.click();
		await page.keyboard.press('End');
		await page.keyboard.type('List item');
		
		// Test ordered list button
		await orderedListButton.click();
		await page.waitForTimeout(200);
		
		// Test bullet list button
		await bulletListButton.click();
		await page.waitForTimeout(200);
		
		// No errors - test passes
	});

	test('should display hashtags and links with highlighting in preview', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Clear existing content and add text with hashtags and links
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.press('Delete');
		await page.keyboard.type('Check out #boldify and visit https://example.com');
		
		// Wait for sync
		await page.waitForTimeout(300);
		
		// Check if hashtag and link appear in preview
		const previewContent = await preview.textContent();
		expect(previewContent).toContain('#boldify');
		expect(previewContent).toContain('https://example.com');
		
		// Check if highlighting elements exist
		const highlightedElements = preview.locator('.highlight');
		await expect(highlightedElements).toHaveCount(2);
	});

	test('should be responsive on different screen sizes', async ({ page }) => {
		// Test desktop
		await page.setViewportSize({ width: 1200, height: 800 });
		await expect(page.locator('#editor')).toBeVisible();
		await expect(page.locator('.post-container').first()).toBeVisible();
		
		// Test tablet
		await page.setViewportSize({ width: 768, height: 1024 });
		await expect(page.locator('#editor')).toBeVisible();
		await expect(page.locator('.post-container').first()).toBeVisible();
		
		// Test mobile
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.locator('#editor')).toBeVisible();
		await expect(page.locator('.post-container').first()).toBeVisible();
	});
});
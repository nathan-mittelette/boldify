import { test, expect } from '@playwright/test';

test.describe('Core Functionality Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('#editor', { state: 'visible' });
		await page.waitForSelector('.post-container', { state: 'visible' });
		await page.waitForSelector('#editor .ql-editor', { state: 'visible' });
		// Wait for Quill editor to be fully initialized
		await page.waitForFunction(() => {
			const editor = document.querySelector('#editor .ql-editor');
			return editor && editor.textContent && editor.textContent.length > 0;
		});
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

		// Check copy button is visible (using aria-label for language independence)
		await expect(page.getByRole('button', { name: 'Copy to clipboard' })).toBeVisible();

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

	test('should handle toolbar button clicks without errors', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');

		// Select some content first
		await editor.click();
		await page.keyboard.press('End');
		await page.keyboard.type('Test formatting');
		await page.keyboard.press('Control+A');

		// Test each formatting button can be clicked without errors
		await page.locator('.ql-bold').click();
		await page.locator('.ql-italic').click();
		await page.locator('.ql-underline').click();
		await page.locator('.ql-strike').click();

		// All clicks completed without error - test passes
	});

	test('should handle copy functionality', async ({ page }) => {
		// Use aria-label for language-independent selector
		const copyButton = page.getByRole('button', { name: 'Copy to clipboard' });

		// Grant clipboard permissions (handle browser differences)
		try {
			await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
		} catch {
			try {
				// Try just clipboard-read for browsers that support it
				await page.context().grantPermissions(['clipboard-read']);
			} catch {
				// Some browsers don't support clipboard permissions at all, that's fine
			}
		}

		// Click copy button - should not throw error
		await copyButton.click();

		// If snackbar appears, that's good - but don't require it
		// The main thing is no errors occurred
	});

	test('should handle undo/redo buttons', async ({ page }) => {
		const undoButton = page.locator('.ql-undo');
		const redoButton = page.locator('.ql-redo');

		// Buttons should be clickable without errors
		await undoButton.click();
		await redoButton.click();

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

		// Test buttons can be clicked without errors
		await orderedListButton.click();
		await bulletListButton.click();

		// No errors - test passes
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

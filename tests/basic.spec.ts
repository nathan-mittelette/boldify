import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
	test('should load the homepage', async ({ page }) => {
		await page.goto('/');
		
		// Check if the main elements are present
		await expect(page).toHaveTitle(/Boldify/);
		
		// Check if editor section is visible (use first occurrence)
		await expect(page.locator('#text-editor').first()).toBeVisible();
		
		// Check if the editor container is visible
		await expect(page.locator('#editor')).toBeVisible();
		
		// Check if preview container is visible (use first occurrence)
		await expect(page.locator('.post-container').first()).toBeVisible();
	});

	test('should have working navigation and sections', async ({ page }) => {
		await page.goto('/');
		
		// Check if intro section exists
		const introSection = page.locator('section').first();
		await expect(introSection).toBeVisible();
		
		// Check if footer exists
		const footer = page.locator('footer');
		await expect(footer).toBeVisible();
	});
});
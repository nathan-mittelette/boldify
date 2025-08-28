import { test, expect } from '@playwright/test';

test.describe('Text Preview', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		// Wait for both editor and preview to be loaded
		await page.waitForSelector('#editor', { state: 'visible' });
		await page.waitForSelector('.post-container', { state: 'visible' });
		// Wait for the Quill editor content to be available
		await page.waitForSelector('#editor .ql-editor', { state: 'visible' });
		// Additional wait to ensure editor is fully initialized
		await page.waitForTimeout(1000);
	});

	test('should display preview container with LinkedIn post structure', async ({ page }) => {
		// Check if preview container is visible
		await expect(page.locator('.post-container').first()).toBeVisible();
		
		// Check if profile image is visible
		await expect(page.locator('.post-container enhanced\\:img')).toBeVisible();
		
		// Check if user info is displayed
		await expect(page.locator('.post-container .text-sm.font-semibold')).toBeVisible();
		
		// Check if text container is visible
		await expect(page.locator('.text-container')).toBeVisible();
		
		// Check if action buttons are visible (Like, Comment, Repost, Send)
		await expect(page.locator('.action-button').first()).toBeVisible();
		await expect(page.locator('.action-button')).toHaveCount(4);
	});

	test('should sync editor content with preview', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Clear editor and add test text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('This is a test post for LinkedIn');
		
		// Wait for sync
		await page.waitForTimeout(100);
		
		// Check if preview displays the same text
		await expect(preview).toContainText('This is a test post for LinkedIn');
	});

	test('should display formatted text correctly in preview', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const boldButton = page.locator('.ql-bold');
		const preview = page.locator('.text-container pre').first();
		
		// Add and format text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Bold text here');
		
		// Select text and make it bold
		await page.keyboard.press('Control+A');
		await boldButton.click();
		
		// Wait for sync
		await page.waitForTimeout(100);
		
		// Check if preview contains the formatted text
		await expect(preview).toContainText('Bold text here');
		
		// The preview should show the actual formatted content from the editor
		const previewContent = await preview.textContent();
		expect(previewContent).toContain('Bold text here');
	});

	test('should highlight hashtags and links in preview', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Add text with hashtags and links
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Check out #boldify and visit https://boldify.net for more info!');
		
		// Wait for sync
		await page.waitForTimeout(100);
		
		// Check if preview contains the text
		await expect(preview).toContainText('#boldify');
		await expect(preview).toContainText('https://boldify.net');
		
		// Check if hashtags and links are highlighted
		const highlightedHashtag = preview.locator('.highlight');
		await expect(highlightedHashtag).toHaveCount(2); // #boldify and https://boldify.net
		
		// Check if the highlighted elements contain the expected text
		const highlightedTexts = await highlightedHashtag.allTextContents();
		expect(highlightedTexts.some(text => text.includes('#boldify'))).toBeTruthy();
		expect(highlightedTexts.some(text => text.includes('https://boldify.net'))).toBeTruthy();
	});

	test('should preserve line breaks in preview', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Add multiline text
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.type('Line 1');
		await page.keyboard.press('Enter');
		await page.keyboard.type('Line 2');
		await page.keyboard.press('Enter');
		await page.keyboard.type('Line 3');
		
		// Wait for sync
		await page.waitForTimeout(100);
		
		// Check if preview preserves line breaks
		const previewText = await preview.textContent();
		expect(previewText).toContain('Line 1');
		expect(previewText).toContain('Line 2');
		expect(previewText).toContain('Line 3');
		
		// Check if the preview element uses whitespace-pre-wrap to preserve formatting
		await expect(preview).toHaveClass(/whitespace-pre-wrap/);
	});

	test('should show action buttons with correct labels', async ({ page }) => {
		// Check Like button
		const likeButton = page.locator('.action-button').first();
		await expect(likeButton).toContainText('Like');
		
		// Check Comment button
		const commentButton = page.locator('.action-button').nth(1);
		await expect(commentButton).toContainText('Comment');
		
		// Check Repost button
		const repostButton = page.locator('.action-button').nth(2);
		await expect(repostButton).toContainText('Repost');
		
		// Check Send button
		const sendButton = page.locator('.action-button').nth(3);
		await expect(sendButton).toContainText('Send');
	});

	test('should display engagement stats', async ({ page }) => {
		// Check if likes/reactions are displayed
		const likesSection = page.locator('.cursor-pointer.hover\\:text-\\[\\#0A66C2FF\\]').first();
		await expect(likesSection).toContainText('100');
		
		// Check if comments count is displayed
		const commentsSection = page.getByText(/\d+ comments?/i);
		await expect(commentsSection).toBeVisible();
		
		// Check if reposts count is displayed
		const repostsSection = page.getByText(/\d+ reposts?/i);
		await expect(repostsSection).toBeVisible();
	});

	test('should have hover effects on interactive elements', async ({ page }) => {
		// Test hover effect on action buttons
		const likeButton = page.locator('.action-button').first();
		
		// Hover over the like button
		await likeButton.hover();
		
		// Check if hover styles are applied (button should change background)
		const buttonStyles = await likeButton.evaluate(el => getComputedStyle(el));
		// The hover effect should change background color
		expect(buttonStyles.cursor).toBe('pointer');
		
		// Test hover effect on engagement stats
		const engagementStat = page.locator('.cursor-pointer.hover\\:text-\\[\\#0A66C2FF\\]').first();
		await engagementStat.hover();
		
		// Verify it's hoverable
		const statStyles = await engagementStat.evaluate(el => getComputedStyle(el));
		expect(statStyles.cursor).toBe('pointer');
	});

	test('should handle empty content gracefully', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const preview = page.locator('.text-container pre').first();
		
		// Clear all content
		await editor.click();
		await page.keyboard.press('Control+A');
		await page.keyboard.press('Delete');
		
		// Wait for sync
		await page.waitForTimeout(100);
		
		// Preview should still be visible but might show placeholder text
		await expect(preview).toBeVisible();
	});

	test('should handle long content with scrolling', async ({ page }) => {
		const editor = page.locator('#editor .ql-editor');
		const textContainer = page.locator('.text-container');
		
		// Add very long text
		await editor.click();
		await page.keyboard.press('Control+A');
		
		let longText = '';
		for (let i = 0; i < 100; i++) {
			longText += `This is line ${i + 1} of very long content that should test scrolling behavior. `;
		}
		
		await page.keyboard.type(longText);
		
		// Wait for sync
		await page.waitForTimeout(200);
		
		// Check if text container has scroll behavior
		await expect(textContainer).toHaveCSS('overflow-y', 'auto');
		
		// Check if max-height is set for scrolling
		const maxHeight = await textContainer.evaluate(el => getComputedStyle(el).maxHeight);
		expect(maxHeight).not.toBe('none');
	});

	test('should maintain responsive design on different screen sizes', async ({ page }) => {
		// Test desktop view
		await page.setViewportSize({ width: 1200, height: 800 });
		await expect(page.locator('.post-container')).toBeVisible();
		
		// Test tablet view
		await page.setViewportSize({ width: 768, height: 1024 });
		await expect(page.locator('.post-container')).toBeVisible();
		
		// Test mobile view
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.locator('.post-container')).toBeVisible();
		
		// Check if action buttons adapt on small screens (text might be hidden)
		const actionButton = page.locator('.action-button').first();
		await expect(actionButton).toBeVisible();
	});
});
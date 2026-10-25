import { test, expect } from '@playwright/test';

for (const width of [375, 1440]) {
	test(`FAQ categories, complete answers and reduced motion at ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await page.goto('/en/help');
		const categories = page.getByRole('button', { name: 'MCP', exact: false });
		const visibleCategory = width < 768 ? categories.last() : categories.first();
		await expect(visibleCategory).toHaveCSS('cursor', 'pointer');
		await visibleCategory.click();
		const questions = page.locator('button[aria-controls^="faq-"]');
		const first = questions.first();
		await expect(first).toHaveCSS('cursor', 'pointer');
		await first.click();
		await expect(first).toHaveAttribute('aria-expanded', 'true');
		const panel = page.locator('#' + (await first.getAttribute('aria-controls')));
		await expect(panel).toHaveCSS('opacity', '1');
		expect(
			await panel.evaluate((element) => element.clientHeight >= element.scrollHeight - 1)
		).toBe(true);
		const tip = panel.locator('.bg-neutral-50');
		await expect(tip).toBeVisible();
		await expect(tip).toHaveCSS('border-left-width', '0px');
		await first.click();
		await expect(panel).toHaveCSS('opacity', '0');
		await expect(panel).toHaveAttribute('inert', '');
		await first.click();
		await first.click();
		await questions.last().click();
		await expect(questions.last()).toHaveAttribute('aria-expanded', 'true');
		await expect(first).toHaveAttribute('aria-expanded', 'false');
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await expect(panel).toHaveCSS('transition-duration', '0s');
		await first.click();
		await expect(panel).toHaveCSS('opacity', '1');
		const formatting = page.getByRole('button', { name: /Text Formatting/i });
		await (width < 768 ? formatting.last() : formatting.first()).click();
		await expect(page.locator('button[aria-expanded="true"][aria-controls^="faq-"]')).toHaveCount(
			0
		);
	});
}

for (const language of ['fr', 'en', 'es', 'pt', 'de', 'tr', 'pl']) {
	test(`FAQ interactions remain localized: ${language}`, async ({ page }) => {
		await page.goto(`/${language}/help`);
		const category = page.locator('button[data-category="mcp"]:visible');
		await category.click();
		await expect(category).toHaveAttribute('aria-pressed', 'true');
		const question = page.locator('button[aria-controls^="faq-"]').first();
		await question.click();
		await expect(question).toHaveAttribute('aria-expanded', 'true');
		const answer = page.locator('#' + (await question.getAttribute('aria-controls')));
		await expect(answer).toHaveCSS('opacity', '1');
		await expect(answer.locator('.bg-neutral-50')).toHaveCSS('border-left-width', '0px');
	});
}

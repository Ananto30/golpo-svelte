import { expect, test } from '@playwright/test';

test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Golpo/);
    await expect(page.locator('h1')).toBeVisible();
});

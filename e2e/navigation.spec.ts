import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to different pages', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Dealism/);

    const loginLink = page.getByRole('link', { name: /login/i });
    await expect(loginLink).toBeVisible();

    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();

    await page.goto('/register');
    await expect(page.getByRole('heading', { name: /register/i })).toBeVisible();
  });

  test('should navigate via anchor links', async ({ page }) => {
    await page.goto('/');

    await page.locator('a[href="#product"]').first().click();
    await expect(page).toHaveURL(/#product/);

    await page.locator('a[href="#features"]').first().click();
    await expect(page).toHaveURL(/#features/);

    await page.locator('a[href="#pricing"]').first().click();
    await expect(page).toHaveURL(/#pricing/);

    await page.locator('a[href="#faq"]').first().click();
    await expect(page).toHaveURL(/#faq/);
  });
});

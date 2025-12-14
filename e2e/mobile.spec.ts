import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 12'],
});

test.describe('Mobile Navigation', () => {
  test('should open and close mobile menu', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.getByLabel(/open menu/i);
    await expect(menuButton).toBeVisible();

    await menuButton.click();

    const mobileMenu = page.getByRole('dialog', { name: /mobile navigation/i });
    await expect(mobileMenu).toBeVisible();

    const closeButton = page.getByLabel(/close menu/i);
    await closeButton.click();

    await expect(mobileMenu).not.toBeVisible();
  });

  test('should have language switcher in mobile menu', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.getByLabel(/open menu/i);
    await menuButton.click();

    const languageSwitcher = page.getByLabel(/change language/i);
    await expect(languageSwitcher).toBeVisible();

    await languageSwitcher.click();

    await page.waitForURL(/\/es/);

    await expect(page.getByRole('heading', { name: /transforma tu flujo de trabajo/i })).toBeVisible();
  });
});

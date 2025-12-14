import { test, expect } from '@playwright/test';

test.describe('Internationalization', () => {
  test('should default to English', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: /transform your workflow/i })).toBeVisible();
    await expect(page.getByText(/get beta access/i).first()).toBeVisible();
  });

  test('should display Spanish content on /es', async ({ page }) => {
    await page.goto('/es');
    
    await expect(page.getByRole('heading', { name: /transforma tu flujo de trabajo/i })).toBeVisible();
    await expect(page.getByText(/obtener acceso beta/i).first()).toBeVisible();
  });

  test('should switch language via language switcher', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: /transform your workflow/i })).toBeVisible();
    
    const languageSwitcher = page.getByLabel(/change language/i).first();
    await languageSwitcher.click();
    
    await page.waitForURL(/\/es/);
    
    await expect(page.getByRole('heading', { name: /transforma tu flujo de trabajo/i })).toBeVisible();
  });

  test('should preserve anchor when switching language', async ({ page }) => {
    await page.goto('/#pricing');
    
    await page.waitForURL(/#pricing/);
    
    const languageSwitcher = page.getByLabel(/change language/i).first();
    await languageSwitcher.click();
    
    await page.waitForURL(/\/es#pricing/);
    
    await expect(page).toHaveURL(/#pricing/);
  });

  test('should have localized metadata', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/transform your workflow/i);
    
    await page.goto('/es');
    await expect(page).toHaveTitle(/transforma tu flujo de trabajo/i);
  });
});

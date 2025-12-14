import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load home page quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    console.log(`Page load time: ${loadTime}ms`);
    
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have critical content visible quickly', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.getByRole('heading', { name: /transform your workflow/i });
    await expect(heading).toBeVisible({ timeout: 3000 });
  });

  test('should not have layout shifts on load', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.getByRole('heading', { name: /transform your workflow/i });
    const initialPosition = await heading.boundingBox();
    
    await page.waitForTimeout(1000);
    
    const finalPosition = await heading.boundingBox();
    
    expect(initialPosition?.y).toBe(finalPosition?.y);
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/');
    
    const title = await page.title();
    expect(title).toContain('Dealism');
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
    
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
  });

  test('should load fonts efficiently', async ({ page }) => {
    await page.goto('/');
    
    const computedStyle = await page.evaluate(() => {
      const element = document.querySelector('h1');
      return window.getComputedStyle(element!).fontFamily;
    });
    
    expect(computedStyle).toContain('Inter');
  });

  test('should be responsive', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },   // Mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1920, height: 1080 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      
      const heading = page.getByRole('heading', { name: /transform your workflow/i });
      await expect(heading).toBeVisible();
      
      console.log(`✓ Tested viewport: ${viewport.width}x${viewport.height}`);
    }
  });
});

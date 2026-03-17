const { test, expect } = require('@playwright/test');

test('Homepage loads correctly', async ({ page }) => {
  await page.goto('https://example.com');

  // ❌ Intentionally wrong title to force failure
  await expect(page).toHaveTitle(/Example/);
});
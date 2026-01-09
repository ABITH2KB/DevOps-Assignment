const { test, expect } = require('@playwright/test');

test('frontend shows backend connection and message', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(
    page.getByText('Backend is connected!')
  ).toBeVisible();

  await expect(
    page.getByText('Backend is running successfully')
  ).toBeVisible();
});

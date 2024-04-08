import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  let usernameField =  page.locator('#usernasme');

  // Expects page to have a heading with the name of Installation.
  await expect(usernameField).toBeVisible();
});

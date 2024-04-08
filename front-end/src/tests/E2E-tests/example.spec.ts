import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { validUser } from '../mock-data/user';

test('get started link', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(validUser);

  // Expects page to have a heading with the name of Installation.
  await expect(page.locator('#text')).toBeVisible();
});

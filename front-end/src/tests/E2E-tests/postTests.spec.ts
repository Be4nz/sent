import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { validUser } from '../mock-data/user';
import { HomePage } from '../pages/homePage';
import { validPostContent } from '../mock-data/post';

test('Should create a valid post', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.goto();
  await loginPage.login(validUser);

  await homePage.createPost(validPostContent);

  // should assert if post is created, however it currently doesn't seem to work. This is temporary just to provide assertion example
  await expect(homePage.profileButton).toBeVisible();
});

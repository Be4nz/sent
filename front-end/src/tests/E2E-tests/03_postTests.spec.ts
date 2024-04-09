import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { validPostContent } from '../mock-data/post';

const setupHomePage = async (page: Page) => {
	const homePage = new HomePage(page);
	await homePage.gotoBase();
	await homePage.check();
	return homePage;
};

test('Create post functionality works correctly with valid data', async ({ page }) => {
	const homePage = await setupHomePage(page);

	await homePage.createPost(validPostContent);

	// TODO: Check if the post was created successfully
	/*expect(await homePage.page.locator(`p:has-text("${validPostContent}")`)).toHaveText(validPostContent);*/
});

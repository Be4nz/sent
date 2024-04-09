import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { validPostContent } from '../mock-data/post';
import {
	deletePostRepositoryByContent
} from '../../../../back-end/src/APIs/repositories/postRepository';


const setupHomePage = async (page: Page) => {
	const homePage = new HomePage(page);
	await homePage.gotoBase();
	await homePage.check();
	return homePage;
};

test('Create post functionality works correctly with valid data', async ({ page }) => {
	const homePage = await setupHomePage(page);

	await homePage.createPost(validPostContent);

	const post = homePage.getPost(validPostContent);

	await expect(await post).toBeVisible();

	deletePostRepositoryByContent(validPostContent);	
});

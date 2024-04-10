import { test, expect, Page } from '@playwright/test';
import { ProfilePage } from '../pages/profilePage';

const user = 'admin';

const setupProfilePage = async (page: Page, username: string) => {
	const profilePage = new ProfilePage(page);
	// Go to the profile page of the user we want to follow
	await profilePage.gotoProfile(username);
	await profilePage.check();
	return profilePage;
};

test('Follow user functionality works correctly', async ({ page }) => {
	const profilePage = await setupProfilePage(page, user);

	// Check initial state: Follow button should be present and contain "Follow"
	await expect(profilePage.followButton).toHaveText('Follow');

	// Follow the user
	await profilePage.followUser();

	// Check if the follow action was successful: Follow button should now contain "Following"
	await expect(profilePage.followButton).toHaveText('Following');

	// Unfollow the user
	await profilePage.followUser();

	// Check if the unfollow action was successful: Follow button should now contain "Follow" again
	await expect(profilePage.followButton).toHaveText('Follow');
});

test('Followers display button works correctly', async ({ page }) => {
	const profilePage = await setupProfilePage(page, user);

	// Click on the followers button
	await profilePage.followersButton.click();

	const modal = await profilePage.getFollowersModal();

	await expect(modal).toBeVisible();
});

test('Following display button works correctly', async ({ page }) => {
	const profilePage = await setupProfilePage(page, user);

	// Click on the following button
	await profilePage.followingButton.click();

	const modal = await profilePage.getFollowingModal();

	await expect(modal).toBeVisible();
});

test('Followers and following modal close button works correctly', async ({ page }) => {
	const profilePage = await setupProfilePage(page, user);

	// Click on the following button
	await profilePage.followingButton.click();

	const modal = await profilePage.getFollowingModal();
	const button = await profilePage.getFollowModalCloseButton();

	await expect(modal).toBeVisible();
	await expect(button).toBeVisible();

	// Click on the close button
	await button.click();

	await expect(modal).not.toBeVisible();
	await expect(button).not.toBeVisible();
});

import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/profilePage';

test('Follow user functionality works correctly', async ({ page }) => {
	const profilePage = new ProfilePage(page);

	const user = 'user';

	// Go to the profile page of the user we want to follow
	await profilePage.gotoProfile(user);

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

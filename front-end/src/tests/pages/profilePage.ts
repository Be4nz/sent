import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ProfilePage extends BasePage {
	page: Page;
	followButton: Locator;
	followersButton: Locator;
	followingButton: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.followButton = this.page.locator('#follow-button');
		this.followersButton = this.page.locator('#followers-button');
		this.followingButton = this.page.locator('#following-button');
	}

	async gotoProfile(username: string) {
		await this.page.goto(`http://localhost:3000/profile/${username}`);
		await this.waitForPageLoad();
	}

	async check() {
		if (!(await this.followButton.isVisible())) fail('Button "follow" not found');
		if (!(await this.followersButton.isVisible())) fail('Button "followers" not found');
		if (!(await this.followingButton.isVisible())) fail('Button "following" not found');
	}

	async followUser() {
		await this.followButton.click();
		this.followButton = this.page.locator('#follow-button');
	}

	async getFollowersModal() {
		const modal = this.page.locator('//div[@role="presentation" and contains(., "Followers")]');
		return modal;
	}

	async getFollowingModal() {
		const modal = this.page.locator('//div[@role="presentation" and contains(., "Following")]');
		return modal;
	}

	async getFollowModalCloseButton() {
		const closeButton = this.page.locator('#close-modal-button');
		return closeButton;
	}
}

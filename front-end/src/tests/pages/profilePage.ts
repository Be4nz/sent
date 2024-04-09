import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ProfilePage extends BasePage {
	page: Page;
	followButton: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.followButton = this.page.locator('#follow-button');
	}

	async gotoProfile(username: string) {
		await this.page.goto(`http://localhost:3000/profile/${username}`);
	}

	async check() {
		if (!this.followButton) fail('Button "follow" not found');
	}

	async followUser() {
		await this.followButton.click();
		this.followButton = this.page.locator('#follow-button');
	}
}

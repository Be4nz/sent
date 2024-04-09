import { Page, Locator } from '@playwright/test';

export class BasePage {
	page: Page;
	hamburgerButton: Locator;
	profileButton: Locator;
	lightmodeButton: Locator;
	logoutButton: Locator;
	homePageButton: Locator;
	profilePageButton: Locator;
	followingPageButton: Locator;
	savedPageButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.hamburgerButton = this.page.locator('#basic-button');
		this.profileButton = this.page.locator("//li[contains(.,'Profile')]");
		this.lightmodeButton = this.page.locator("//li[contains(.,'Light mode')]");
		this.logoutButton = this.page.locator("//li[contains(.,'Logout')]");
		this.homePageButton = this.page.locator("//ul/div[contains(.,'Home')]");
		this.profilePageButton = this.page.locator("//ul/div[contains(.,'Profile')]");
		this.followingPageButton = this.page.locator("//ul/div[contains(.,'Following')]");
		this.savedPageButton = this.page.locator("//ul/div[contains(.,'Saved')]");
	}

	async gotoBase() {
		await this.page.goto('http://localhost:3000');
	}

	async profileButtonClick() {
		await this.hamburgerButton.click();
		await this.profileButton.click();
	}

	async lightmodeButtonClick() {
		await this.hamburgerButton.click();
		await this.lightmodeButton.click();
	}

	async logoutButtonClick() {
		await this.hamburgerButton.click();
		await this.logoutButton.click();
	}
}

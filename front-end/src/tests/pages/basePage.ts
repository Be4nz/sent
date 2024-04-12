import { Page, Locator } from '@playwright/test';
import { wait } from '@testing-library/user-event/dist/utils';

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
	loadingLogo: Locator;

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
		this.loadingLogo = this.page.locator('#loading-logo-icon');
	}

	async gotoBase() {
		await this.page.goto('http://localhost:3000');
		await this.waitForPageLoad();
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

	async waitForPageLoad() {
		while (await this.loadingLogo.isVisible()) {
			await wait(1000);
		}
	}

	async getToken() {
		const state = await this.page.context().storageState();
		let token = '';

		state.origins.forEach((origin) => {
			if (origin.origin === 'http://localhost:3000') {
				origin.localStorage.forEach((item) => {
					if (
						item.name ===
						'@@auth0spajs@@::ajdhrgs95XQ602gfbEJ6MyALBSB99zjl::c869398c-c7a9-4128-8e4c-482ce3777817::openid profile email offline_access'
					) {
						const match = item.value.match(/"access_token":"([^"]+)"/);
						if (match) {
							token = match[1];
						}
					}
				});
			}
		});

		return token;
	}
}

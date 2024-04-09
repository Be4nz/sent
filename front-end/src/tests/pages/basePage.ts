import { Page, Locator } from '@playwright/test';

export class BasePage {
    page: Page;
    profileIconButton: Locator;
    homeButton: Locator;
    profileButton: Locator;
    followingButton: Locator;
    savedButton: Locator;
    logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileIconButton = this.page.locator("header img.MuiAvatar-img");
        this.homeButton = this.page.locator("//ul/div[contains(.,'Home')]");
        this.profileButton = this.page.locator("//ul/div[contains(.,'Profile')]");
        this.followingButton = this.page.locator("//ul/div[contains(.,'Following')]");
        this.savedButton = this.page.locator("//ul/div[contains(.,'Saved')]");
        this.logoutButton = this.page.locator("//li[contains(.,'Logout')]");

    }
    
}
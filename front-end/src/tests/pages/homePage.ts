import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
    page: Page;
    postCreationInitializeButton: Locator;
    postTextField: Locator;
    postButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.postCreationInitializeButton = this.page.locator("form img.MuiAvatar-img");
        this.postTextField = this.page.locator("div[role='presentation'] textarea[name='content']");
        this.postButton = this.page.locator("div[role='presentation']  button p");
    }

    async createPost(content: string){
        await this.postCreationInitializeButton.click();
        await this.postTextField.fill(content);
        await this.postButton.click();
    }
}
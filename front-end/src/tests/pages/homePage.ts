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
		this.postCreationInitializeButton = this.page.locator('form img.MuiAvatar-img');
		this.postTextField = this.page.locator("div[role='presentation'] textarea[name='content']");
		this.postButton = this.page.locator("//div[@role='presentation']//button[contains(.,'Sent')]");
	}

	async check() {
		if (!this.postCreationInitializeButton) fail('Button "postCreationInitialize" not found');
		if (!this.postTextField) fail('Input field "post" not found');
		if (!this.postButton) fail('Button "post" not found');
	}

	async createPost(content: string, shouldClick = true) {
		await this.postCreationInitializeButton.click();
		await this.postTextField.fill(content);
		if(shouldClick)
			await this.postButton.click();
	}

	async getPost(content: string) {
		const post = this.page.locator(`//ul/li[contains(@class,'MuiListItem-gutters')][contains(.,'${content}')]`);
		return post;
	}
}

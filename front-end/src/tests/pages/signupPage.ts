import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class SignupPage extends BasePage {
	page: Page;
	nameField: Locator;
	descriptionField: Locator;
	submitButton: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.nameField = this.page.locator('input[name="name"]');
		this.descriptionField = this.page.locator('input[name="description"]');
		this.submitButton = this.page.locator('button[type="submit"]');
	}

	async gotoSignup() {
		await this.page.goto('http://localhost:3000/signup');
	}

	async check() {
		if (!this.nameField) fail('Input field "name" not found');
		if (!this.descriptionField) fail('Input field "description" not found');
		if (!this.submitButton) fail('Button "submit" not found');
	}
}

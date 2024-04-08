import { User } from '@auth0/auth0-react';
import { Page, Locator } from '@playwright/test';

export class LoginPage {
    page: Page;
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator("//button[contains(.,'Log in')]");
    }

    async goto() {
        await this.page.goto('http://localhost:3000/');
    }

    async login(user: User) {
        await this.usernameField.fill(user.username);
        await this.passwordField.fill(user.password);
        await this.loginButton.click();
    }
}
import { test, expect, Page } from '@playwright/test';
import { SignupPage } from '../pages/signupPage';
import { del } from '../../api/Api';
import { validTester_unknown } from '../mock-data/user';

const setupSignupPage = async (page: Page) => {
	const signupPage = new SignupPage(page);
	await signupPage.gotoSignup();
	await signupPage.check();
	return signupPage;
};

test('Main pages redirect to signup page when user is not in the system', async ({ page }) => {
	const signupPage = new SignupPage(page);
	await signupPage.gotoBase();
	await signupPage.page.waitForURL('http://localhost:3000/signup');
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.homePageButton.click();
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.profilePageButton.click();
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.followingPageButton.click();
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.savedPageButton.click();
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.profileButtonClick();
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.logoutButtonClick();
	expect(await signupPage.page.url()).not.toBe('http://localhost:3000/signup');
});

test('Signup functionality works correctly with empty fields', async ({ page }) => {
	const signupPage = await setupSignupPage(page);
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.submitButton.click();

	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');
});

test('Signup functionality works correctly with empty name field', async ({ page }) => {
	const signupPage = await setupSignupPage(page);
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.descriptionField.fill('Hello, I am a tester!');
	await signupPage.submitButton.click();

	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');
});

test('Signup functionality works correctly with 1 character name', async ({ page }) => {
	const signupPage = await setupSignupPage(page);
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.nameField.fill('t');
	await signupPage.descriptionField.fill('Hello, I am a tester!');
	await signupPage.submitButton.click();

	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');
	expect(await signupPage.page.locator('#\\:r1\\:-helper-text')).toBeVisible();
	expect(await signupPage.page.locator('#\\:r1\\:-helper-text').innerText()).toBe(
		'String must contain at least 2 character(s)'
	);
});

test('Signup functionality works correctly with 21 character name', async ({ page }) => {
	const signupPage = await setupSignupPage(page);
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.nameField.fill('t'.repeat(21));
	await signupPage.descriptionField.fill('Hello, I am a tester!');
	await signupPage.submitButton.click();

	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');
	expect(await signupPage.page.locator('#\\:r1\\:-helper-text')).toBeVisible();
	expect(await signupPage.page.locator('#\\:r1\\:-helper-text').innerText()).toBe(
		'String must contain at most 20 character(s)'
	);
});

test('Signup functionality works correctly with 256 character description', async ({ page }) => {
	const signupPage = await setupSignupPage(page);
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.nameField.fill('tester');
	await signupPage.descriptionField.fill('t'.repeat(256));
	await signupPage.submitButton.click();

	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');
	expect(await signupPage.page.locator('#\\:r3\\:-helper-text')).toBeVisible();
	expect(await signupPage.page.locator('#\\:r3\\:-helper-text').innerText()).toBe(
		'String must contain at most 255 character(s)'
	);
});

test('Signup functionality works correctly with filled fields', async ({ page }) => {
	const signupPage = await setupSignupPage(page);
	expect(await signupPage.page.url()).toBe('http://localhost:3000/signup');

	await signupPage.nameField.fill('tester');
	await signupPage.descriptionField.fill('Hello, I am a tester!');
	await signupPage.submitButton.click();

	await signupPage.page.waitForURL('http://localhost:3000/');
	expect(await signupPage.page.url()).toBe('http://localhost:3000/');

	// Cleanup
	await del(`/users/username/${validTester_unknown.username}`, await signupPage.getToken());
});

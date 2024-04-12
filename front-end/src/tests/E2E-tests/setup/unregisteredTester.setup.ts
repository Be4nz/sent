import { test as setup } from '@playwright/test';
import { validTester_unknown } from '../../mock-data/user';

const authFile = 'playwright/.auth/unregistered.json';

setup('Authenticating...', async ({ page }) => {
	// Start of authentication steps.
	await page.goto('http://localhost:3000/');
	await page.fill('#username', validTester_unknown.username);
	await page.fill('#password', validTester_unknown.password);
	await page.click('button[name="action"][value="default"]');

	// Wait for the final URL to ensure that the cookies are actually set.
	await page.waitForURL('http://localhost:3000/');

	// End of authentication steps.
	await page.context().storageState({ path: authFile });
});

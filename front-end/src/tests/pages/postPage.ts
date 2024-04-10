import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class PostPage extends BasePage {
	page: Page;
	commentTextField: Locator;
	commentSendButton: Locator;
	noCommentIcon: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.commentSendButton = this.page.locator("button[type='submit']");
		this.commentTextField = this.page.locator("textarea[aria-invalid='false']");
		this.noCommentIcon = this.page.locator('svg[data-testid="CancelScheduleSendIcon"]');
	}

	async gotoPost(id: string) {
		await this.page.goto(`http://localhost:3000/post/${id}`);
		await this.waitForPageLoad();
	}

	async check() {
		if (!(await this.commentSendButton.isVisible())) fail('Comment button "Send" not found');
		if (!(await this.commentTextField.isVisible())) fail('Input field "comment" not found');
	}

	async inputComment(content: string) {
		await this.commentTextField.click();
		await this.commentTextField.fill(content);
	}

	async sendComment() {
		await this.commentSendButton.click();
	}

	async getComment(content: string) {
		const comment = this.page.locator(`//ul/li[contains(@class,'MuiListItem-gutters')][contains(.,'${content}')]`);
		return comment;
	}
}

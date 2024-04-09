import { test, expect, Page } from '@playwright/test';
import { PostPage } from '../pages/postPage';
import { tooLargePostContent, validPostContent } from '../mock-data/post';
import { deleteCommentRepositoryByContent } from '../../../../back-end/src/APIs/repositories/commentRepository';

const setupPostPage = async (page: Page) => {
	const postPage = new PostPage(page);
	await postPage.gotoBase();
	await postPage.check();
	return postPage;
};

test.only('Create comment functionality works correctly with valid data', async ({ page }) => {
	const postPage = await setupPostPage(page);

	await postPage.gotoPost('1');

	await postPage.inputComment(validPostContent);

	await postPage.sendComment();

	const comment = postPage.getComment(validPostContent);

	await expect(await comment).toBeVisible();

	deleteCommentRepositoryByContent(validPostContent);
});

test.only('Create comment functionality works correctly with non-valid data', async ({ page }) => {
	const postPage = await setupPostPage(page);

	await postPage.gotoPost('1');

	await postPage.inputComment(tooLargePostContent);

	await expect(postPage.commentSendButton).toBeDisabled();
});

test.only('"No comments icon" renders when no comments are sent', async ({ page }) => {
	const postPage = await setupPostPage(page);

	await postPage.gotoPost('11');

	await expect(postPage.noCommentIcon).toBeVisible();
});

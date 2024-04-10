import { test, expect, Page } from '@playwright/test';
import { PostPage } from '../pages/postPage';
import { tooLargePostContent, validPostContent } from '../mock-data/post';
import { deleteCommentRepositoryByContent } from '../../../../back-end/src/APIs/repositories/commentRepository'; // TODO this shouldn't be here

const setupPostPage = async (page: Page, postId: string) => {
	const postPage = new PostPage(page);
	await postPage.gotoPost(postId);
	await postPage.check();
	return postPage;
};

test('Create comment functionality works correctly with valid data', async ({ page }) => {
	const postPage = await setupPostPage(page, '1');

	await postPage.inputComment(validPostContent);

	await postPage.sendComment();

	const comment = postPage.getComment(validPostContent);

	await expect(await comment).toBeVisible();

	// TODO call api to delete the comment, don't use repository from back-end. Reference: 01_signupTests.spec.ts -> line 114
	deleteCommentRepositoryByContent(validPostContent);
});

test('Create comment functionality works correctly with non-valid data', async ({ page }) => {
	const postPage = await setupPostPage(page, '1');

	await postPage.inputComment(tooLargePostContent);

	await expect(postPage.commentSendButton).toBeDisabled();
});

test('"No comments icon" renders when no comments are sent', async ({ page }) => {
	const postPage = await setupPostPage(page, '11');

	await expect(postPage.noCommentIcon).toBeVisible();
});

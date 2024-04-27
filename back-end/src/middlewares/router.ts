import { Router } from 'express';
import { userRouter, postRouter, followRouter, likeRouter, saveRouter, commentLikeRouter } from '../routes';
import { commentRouter } from '../routes/commentRoute';

export const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/follows', followRouter);
router.use('/likes', likeRouter);
router.use('/comments', commentRouter);
router.use('/saves', saveRouter);
router.use('/commentlikes', commentLikeRouter);

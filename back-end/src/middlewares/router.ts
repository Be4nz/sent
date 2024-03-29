import { Router } from 'express';
import { userRouter, postRouter, followRouter } from '../routes';

export const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/follows', followRouter);

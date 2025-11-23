import { json, Router } from 'express';
import fileUpload from 'express-fileupload';

import { responseStatus } from '../configs/resStatus.config';

import authRouter from './auth/auth.router';
import favoriteRouter from './favorite/favorite.router';
import fileRouter from './file/file.router';
import resRouter from './restaurant/res.router';
import userRouter from './user/user.router';

const router = Router();

router.use(json()); // returns mdlwr to handle request with json data
router.use(fileUpload());

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/restaurants', resRouter);
router.use('/files', fileRouter);
router.use('/favorites', favoriteRouter);

router.use('/ping', async (_req, res) => {
  res.status(responseStatus.OK).json({ message: 'pong' });
});

export default router;

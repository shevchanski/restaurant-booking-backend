import { Router } from 'express';

import authMdlwr from './middlewares';
import userMdlwr from '../user/middlewares';
import authController from './controllers';

const router = Router();

router.post(
  '/',
  authMdlwr.validateLoginData,
  userMdlwr.getUserDynamically('body', 'email'),
  authMdlwr.loginUserWithEmail,
  authController.authenticateUser
);

export default router;

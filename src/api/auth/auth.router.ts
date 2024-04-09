import { Router } from 'express';

import authMdlwr from './middlewares';
import userMdlwr from '../user/middlewares';
import authController from './controllers';
import { AuthSubroutes, TokenTypes } from '../../configs/global.config';

const router = Router();

router.post(
  AuthSubroutes.ROOT,
  authMdlwr.validateLoginData,
  userMdlwr.getUserDynamically('body', 'email'),
  authMdlwr.loginUserWithEmail,
  authController.assignTokensToUser
);

router.post(
  AuthSubroutes.REFRESH_TOKENS,
  authMdlwr.validateToken(TokenTypes.REFRESH),
  authController.assignTokensToUser
);

export default router;

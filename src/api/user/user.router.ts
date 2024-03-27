import { Router } from 'express';

import userMdlwr from './middlewares';
import userController from './controllers';
import { UserSubroutes, UserValidationType } from '../../configs/global.config';
import authMdlwr from '../auth/middlewares';

const userRouter = Router();

userRouter.post(
  UserSubroutes.ROOT,
  userMdlwr.validateUserObjectDynamically(UserValidationType.CREATE_USER),
  userMdlwr.checkUserDuplicate(),
  userController.createUser
);

userRouter.get(
  UserSubroutes.BY_USER_ID,
  userMdlwr.validateQueryParamUserId,
  userMdlwr.getUserDynamically(),
  userController.getUserById
);

userRouter.put(
  UserSubroutes.ROOT,
  userMdlwr.validateUserObjectDynamically(UserValidationType.UPDATE_USER),
  authMdlwr.authorizeUser,
  userController.updateUser
);

userRouter.patch(
  UserSubroutes.UPDATE_EMAIL,
  userMdlwr.validateUserObjectDynamically(UserValidationType.UPDATE_EMAIL),
  userMdlwr.checkUserDuplicate(),
  authMdlwr.authorizeUser,
  userController.updateUser
);

userRouter.delete(
  UserSubroutes.ROOT,
  authMdlwr.authorizeUser,
  userController.deleteUser
);

export default userRouter;

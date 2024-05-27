import { Router } from 'express';

import {
  InstanceParam,
  UserSubroutes,
  UserValidationType
} from '../../configs/global.config';
import { validateQueryParam } from '../../middlewares';
import authMdlwr from '../auth/middlewares';
import userController from './controllers';
import userMdlwr from './middlewares';

const userRouter = Router();

userRouter.post(
  UserSubroutes.ROOT,
  userMdlwr.validateUserObjectDynamically(UserValidationType.CREATE_USER),
  userMdlwr.checkUserDuplicate(),
  userController.createUser
);

userRouter.get(
  UserSubroutes.BY_USER_ID,
  validateQueryParam(InstanceParam.USER_ID),
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

userRouter.patch(
  UserSubroutes.UPDATE_PASS,
  userMdlwr.validateUserObjectDynamically(UserValidationType.UPDATE_PASS),
  authMdlwr.authorizeUser,
  userMdlwr.checkUpdatedPassword,
  userController.updateUserPassword
);

export default userRouter;

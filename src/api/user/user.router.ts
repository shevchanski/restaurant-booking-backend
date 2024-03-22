import { Router } from 'express';

import userMdlwr from './middlewares';
import userController from './controllers';
import { UserSubroutes } from '../../configs/global.config';

const userRouter = Router();

userRouter.post(
  UserSubroutes.ROOT,
  userMdlwr.validateUserObjectDynamically('toCreate'),
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
  UserSubroutes.BY_USER_ID,
  userMdlwr.validateQueryParamUserId,
  userMdlwr.validateUserObjectDynamically('toUpdate'),
  userController.updateUser
);
userRouter.patch(
  UserSubroutes.UPDATE_EMAIL,
  userMdlwr.validateQueryParamUserId,
  userMdlwr.validateUpdatedEmail,
  userMdlwr.checkUserDuplicate(),
  userController.updateUser
);
userRouter.delete(
  UserSubroutes.BY_USER_ID,
  userMdlwr.validateQueryParamUserId,
  userController.deleteUser
);

export default userRouter;

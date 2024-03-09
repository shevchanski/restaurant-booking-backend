import { Router } from 'express';

import userMdlwr from './middlewares';
import userController from './controllers';

const userRouter = Router();

userRouter.post(
  '/',
  userMdlwr.validateUserObject,
  userMdlwr.checkUserDuplicate(),
  userController.createUser
);
userRouter.get(
  '/:userId',
  userMdlwr.validateQueryParamUserId,
  userMdlwr.getUserDynamically(),
  userController.getUserById
);
userRouter.put(
  '/:userId',
  userMdlwr.validateQueryParamUserId,
  userMdlwr.validateUserObject,
  userMdlwr.getUserDynamically(),
  userController.updateUser
);
userRouter.delete(
  '/:userId',
  userMdlwr.validateQueryParamUserId,
  userController.deleteUser
);

export default userRouter;

import { Router } from 'express';

import userMdlwr from './middlewares';
import userController from './controllers';

const userRouter = Router();

userRouter.post(
  '/',
  userMdlwr.validateUserObjectDynamically('toCreate'),
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
  userMdlwr.validateUserObjectDynamically('toUpdate'),
  userController.updateUser
);
userRouter.patch(
  '/:userId/updateEmail',
  userMdlwr.validateQueryParamUserId,
  userMdlwr.validateUpdatedEmail,
  userMdlwr.checkUserDuplicate(),
  userController.updateUser
);
userRouter.delete(
  '/:userId',
  userMdlwr.validateQueryParamUserId,
  userController.deleteUser
);

export default userRouter;

import { Response } from 'express';

import errorWrapper from '../../../errors/errorWrapper';
import APIError from '../../../errors/APIError';
import { responseStatus } from '../../../configs/resStatus.config';
import passwordService from '../../../services/password.service';
import { IRequest } from '../../../types/query.types';
import { IUser } from '../../../types/user.types';
import userService from '../user.service';

const updateUser = errorWrapper(async (req: IRequest, res: Response) => {
  const userId = req.params?.userId;
  const userObjectToUpdate: IUser = req.locals?.validatedUserObject;

  if (!userObjectToUpdate || !userId) {
    throw new APIError(
      'Necessary data is not provided',
      responseStatus.INTERNAL_ERROR
    );
  }

  userObjectToUpdate.password = await passwordService.hashPassword(
    userObjectToUpdate.password
  );

  const updatedUser = await userService.updateUser(userId, userObjectToUpdate);

  if (!updatedUser) {
    throw new APIError('Such user does not exist', responseStatus.BAD_REQUEST);
  }

  res.status(responseStatus.OK).json({ data: updatedUser });
});

export default updateUser;

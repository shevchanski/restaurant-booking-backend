import { Response } from 'express';

import errorWrapper from '../../../errors/errorWrapper';
import APIError from '../../../errors/APIError';
import { responseStatus } from '../../../configs/resStatus.config';
import { IRequest } from '../../../types/query.types';
import { IUser } from '../../../types/user.types';
import userService from '../user.service';

const updateUser = errorWrapper(async (req: IRequest, res: Response) => {
  const user = req.user;
  const userObjectToUpdate: IUser = req.locals?.validatedUserData;

  if (!userObjectToUpdate || !user) {
    throw new APIError(
      'Necessary data is not provided',
      responseStatus.INTERNAL_ERROR
    );
  }

  const updatedUser = await userService.updateUser(
    user._id.toString(),
    userObjectToUpdate
  );

  if (!updatedUser) {
    throw new APIError('Such user does not exist', responseStatus.BAD_REQUEST);
  }

  res.status(responseStatus.OK).json({ data: updatedUser });
});

export default updateUser;

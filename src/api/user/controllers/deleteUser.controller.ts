import { Response } from 'express';

import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import APIError from '../../../errors/APIError';
import { IRequest } from '../../../types/query.types';
import userService from '../user.service';

const deleteUser = errorWrapper(async (req: IRequest, res: Response) => {
  const { user } = req;

  if (!user) {
    throw new APIError(
      'Internal error | User contoroller',
      responseStatus.INTERNAL_ERROR
    );
  }

  const deletedUser = await userService.deleteUser(user);

  if (!deletedUser) {
    throw new APIError('Such user does not exist', responseStatus.BAD_REQUEST);
  }

  res.status(responseStatus.OK).json();
});

export default deleteUser;

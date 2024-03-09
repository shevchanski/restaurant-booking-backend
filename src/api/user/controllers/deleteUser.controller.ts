import { Response } from 'express';

import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import APIError from '../../../errors/APIError';
import userService from '../user.service';
import { IRequest } from '../../../types/query.types';

const deleteUser = errorWrapper(async (req: IRequest, res: Response) => {
  const userId = req.params.userId;

  const deletedUser = await userService.deleteUser(userId);

  if (!deletedUser) {
    throw new APIError('Such user does not exist', responseStatus.BAD_REQUEST);
  }

  res.status(responseStatus.OK).json();
});

export default deleteUser;

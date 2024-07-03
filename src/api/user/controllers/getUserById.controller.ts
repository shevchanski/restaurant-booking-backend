import { Response } from 'express';

import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { responseStatus } from '../../../configs/resStatus.config';
import { IRequest } from '../../../types/query.types';

const getUserById = errorWrapper(async (req: IRequest, res: Response) => {
  const { user } = req;

  if (!user) {
    throw new APIError(
      'userToCreate is not found',
      responseStatus.INTERNAL_ERROR
    );
  }

  res.status(responseStatus.OK).json({ user });
});

export default getUserById;

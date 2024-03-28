import { NextFunction, Response } from 'express';

import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import APIError from '../../../errors/APIError';
import { responseStatus } from '../../../configs/resStatus.config';

const checkUpdatedPassword = errorWrapper(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const { validatedUserData } = req.locals;

    if (
      !user ||
      !Object.keys(validatedUserData).length ||
      !validatedUserData.oldPassword ||
      !validatedUserData.newPassword
    ) {
      throw new APIError(
        'Internal error | User mdlwr',
        responseStatus.INTERNAL_ERROR
      );
    }

    if (validatedUserData.oldPassword === validatedUserData.newPassword) {
      throw new APIError(
        'New password has been used before.',
        responseStatus.BAD_REQUEST
      );
    }

    await user.comparePassword(validatedUserData.oldPassword);

    next();
  }
);

export default checkUpdatedPassword;

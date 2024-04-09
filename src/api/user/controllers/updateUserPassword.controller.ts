import { Response } from 'express';

import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { responseStatus } from '../../../configs/resStatus.config';
import { IRequest } from '../../../types/query.types';
import userService from '../user.service';

const updateUserPassword = errorWrapper(
  async (req: IRequest, res: Response) => {
    const { validatedUserData } = req.locals;
    const { user } = req;

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

    const updatedUser = await userService.updateUserPassword(
      validatedUserData.newPassword,
      user
    );

    res.status(responseStatus.OK).json({ user: updatedUser });
  }
);

export default updateUserPassword;

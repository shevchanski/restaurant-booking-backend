import { Response } from 'express';

import errorWrapper from '../../../errors/errorWrapper';
import { responseStatus } from '../../../configs/resStatus.config';
import userService from '../user.service';
import APIError from '../../../errors/APIError';
import { IRequest } from '../../../types/query.types';

const createUserController = errorWrapper(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: IRequest, res: Response) => {
    const userToCreate = req.locals?.validatedUserObject;

    if (!userToCreate) {
      throw new APIError(
        'userToCreate is not found',
        responseStatus.INTERNAL_ERROR
      );
    }

    const createdUser = await userService.createUser(userToCreate);

    res.status(responseStatus.OK).json({ data: createdUser });
  }
);

export default createUserController;

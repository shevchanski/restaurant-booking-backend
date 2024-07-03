import { Response, NextFunction } from 'express';

import { WellKnownErrorTypes } from '../../../configs/error.config';
import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import WellKnownError from '../../../errors/WellKnownError';
import { IUser } from '../../../types/user.types';
import { IRequest } from '../../../types/query.types';
import userService from '../user.service';

const checkUserDuplicate = (
  sourceField: keyof IRequest = 'body',
  sourceProp: keyof IUser | 'userId' = 'email',
  searchBy: keyof IUser | '_id' = sourceProp === 'userId' ? '_id' : sourceProp //TODO define exact type with a help of schema.paths
) =>
  errorWrapper(async (req: IRequest, res: Response, next: NextFunction) => {
    const searchValue = req[sourceField]?.[sourceProp];

    if (!searchValue) {
      throw new WellKnownError(WellKnownErrorTypes.BAD_REQUEST);
    }

    const foundUser = await userService.getUserByParam({
      [searchBy]: searchValue
    });

    if (foundUser) {
      throw new APIError(
        'User with such email already exists',
        responseStatus.BAD_REQUEST
      );
    }

    next();
  });

export default checkUserDuplicate;

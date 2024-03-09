import { NextFunction, Response } from 'express';

import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import userService from '../user.service';
import { IUser } from '../../../types/user.types';
import WellKnownError from '../../../errors/WellKnownError';
import { WellKnownErrorTypes } from '../../../configs/error.config';

const getUserDynamically = (
  sourceField: keyof IRequest = 'params',
  sourceProp: keyof IUser | 'userId' = 'userId',
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

    if (!foundUser) {
      throw new WellKnownError(WellKnownErrorTypes.RECORD_NOT_FOUND);
    }

    req.locals = {
      ...req.locals,
      user: foundUser
    };

    next();
  });

export default getUserDynamically;

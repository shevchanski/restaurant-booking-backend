import { NextFunction, Response } from 'express';

import { WellKnownErrorTypes } from '../../../configs/error.config';
import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import WellKnownError from '../../../errors/WellKnownError';
import { userObjectValidator } from '../user.validator';
import { IRequest } from '../../../types/query.types';

const validateUserObject = errorWrapper(
  (req: IRequest, res: Response, next: NextFunction) => {
    const userObject = req.body;

    if (!userObject) {
      throw new WellKnownError(WellKnownErrorTypes.BAD_REQUEST);
    }

    const { error, value: validatedUserObject } =
      userObjectValidator.validate(userObject);

    if (error) {
      throw new APIError(error.message, responseStatus.BAD_REQUEST);
    }

    req.locals = {
      ...req.locals,
      validatedUserObject
    };

    next();
  }
);

export default validateUserObject;

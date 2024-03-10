import { NextFunction, Response } from 'express';

import { WellKnownErrorTypes } from '../../../configs/error.config';
import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import WellKnownError from '../../../errors/WellKnownError';
import {
  CreatedUserObjectValidator,
  UpdatedUserObjectValidator
} from '../user.validator';
import { IRequest } from '../../../types/query.types';

const validateUserObjectDynamically = (
  purpose: 'toCreate' | 'toUpdate' = 'toUpdate'
) =>
  errorWrapper((req: IRequest, res: Response, next: NextFunction) => {
    const userObject = req.body;

    if (!userObject) {
      throw new WellKnownError(WellKnownErrorTypes.BAD_REQUEST);
    }

    const { error, value: validatedUserObject } = (
      purpose === 'toCreate'
        ? CreatedUserObjectValidator
        : UpdatedUserObjectValidator
    ).validate(userObject);

    if (error) {
      throw new APIError(error.message, responseStatus.BAD_REQUEST);
    }

    req.locals = {
      ...req.locals,
      validatedUserObject
    };

    next();
  });

export default validateUserObjectDynamically;

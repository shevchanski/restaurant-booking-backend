import { NextFunction, Response } from 'express';

import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import { RestObjectValidator } from '../restaurant.validator';

export const validatedResObject = errorWrapper(
  (req: IRequest, res: Response, next: NextFunction) => {
    const resObject = req.body;

    const { error, value: validatedResObject } =
      RestObjectValidator.validate(resObject);

    if (error) {
      throw new APIError(error.message, responseStatus.BAD_REQUEST);
    }

    req.locals = {
      ...req.locals,
      validatedResObject
    };

    next();
  }
);

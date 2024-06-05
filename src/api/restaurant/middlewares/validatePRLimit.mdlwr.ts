import { NextFunction, Response } from 'express';

import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import { PRQueryLimitValidator } from '../restaurant.validator';

export const validatePRLimit = errorWrapper(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const query = req.query;

    const {
      error,
      value: { limit: topK }
    } = PRQueryLimitValidator.validate(query);

    if (error) {
      throw new APIError(error.message, responseStatus.BAD_REQUEST);
    }

    req.locals = {
      ...req.locals,
      topK
    };

    next();
  }
);

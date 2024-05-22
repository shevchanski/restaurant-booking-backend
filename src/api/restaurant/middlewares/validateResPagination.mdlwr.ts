import { NextFunction, Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import { ResPaginationValidator } from '../restaurant.validator';

export const validateResPagination = errorWrapper(
  (req: IRequest, res: Response, next: NextFunction) => {
    const pagination = req.query;

    const { error, value: validatedPagination } =
      ResPaginationValidator.validate(pagination);

    if (error) {
      throw new APIError(error.message, responseStatus.BAD_REQUEST);
    }

    req.locals = {
      ...req.locals,
      validatedPagination
    };

    next();
  }
);

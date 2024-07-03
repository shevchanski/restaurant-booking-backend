import { NextFunction, Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import { GetFavoritesParamValidator } from '../favorite.validator';

export const validateGetFavoritesParam = errorWrapper(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { query } = req;

    const {
      error,
      value: { onlyIds }
    } = GetFavoritesParamValidator.validate(query);

    if (error) {
      throw new APIError(error.message, responseStatus.BAD_REQUEST);
    }

    req.locals = {
      ...req.locals,
      onlyIds
    };

    next();
  }
);

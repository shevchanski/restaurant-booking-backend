import { NextFunction, Response } from 'express';

import { MIN_NUMBER_OF_FAVORITES } from '../../../configs/global.config';
import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import getAllFavoritesByUserId from '../../favorite/services/getAllFavoritesByUserId.service';

export const checkIfUserHasFavorites = errorWrapper(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    const userFavorites = await getAllFavoritesByUserId(userId, true);

    if (!userFavorites.length) {
      throw new APIError(
        `User (userId: ${userId}) doesn't have favorites.`,
        responseStatus.BAD_REQUEST
      );
    } else if (userFavorites.length < MIN_NUMBER_OF_FAVORITES) {
      throw new APIError(
        `(userId: ${userId}) Number of favorites is less then 2. Minimum number of favorites is ${MIN_NUMBER_OF_FAVORITES}.`,
        responseStatus.BAD_REQUEST
      );
    }

    req.locals = {
      ...req.locals,
      userFavorites,
      userId
    };

    next();
  }
);

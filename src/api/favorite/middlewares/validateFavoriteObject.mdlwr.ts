import { NextFunction, Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import { Favorite } from '../../../dataBase/favorite.db';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import { FavoriteDataValidator } from '../favorite.validator';

export const validateFavoriteObject = errorWrapper(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const data = req.body;

    const { error, value } = FavoriteDataValidator.validate(data);

    if (error) {
      throw new APIError(error.message, responseStatus.BAD_REQUEST);
    }

    const favoriteData: Favorite = {
      _user_id: value.userId,
      _restaurant_id: value.restaurantId
    };

    req.locals = {
      ...req.locals,
      favoriteData
    };

    next();
  }
);

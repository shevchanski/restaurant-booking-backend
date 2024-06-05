import { NextFunction, Response } from 'express';
import { isObjectIdOrHexString } from 'mongoose';
import { responseStatus } from '../../../configs/resStatus.config';
import { Favorite } from '../../../dataBase/favorite.db';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import favoriteService from '../services';

export const checkIfFavoured = (action: 'toDelete' | 'toAdd') =>
  errorWrapper(async (req: IRequest, res: Response, next: NextFunction) => {
    const data: Favorite = req.locals.favoriteData;

    if (!isObjectIdOrHexString(data._restaurant_id)) {
      throw new APIError(
        'restaurantId is not an ObjectId type!',
        responseStatus.BAD_REQUEST
      );
    }

    const isFavoured = await favoriteService.findByParamObject(data);

    if (!isFavoured && action === 'toDelete') {
      throw new APIError(
        `Restaurant is not favoured by user with id: '${data._user_id}'`,
        responseStatus.BAD_REQUEST
      );
    } else if (isFavoured && action === 'toAdd') {
      throw new APIError(
        `Restaurant is already in user favorite list`,
        responseStatus.BAD_REQUEST
      );
    }

    next();
  });

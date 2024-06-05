import { NextFunction, Response } from 'express';
import { isObjectIdOrHexString } from 'mongoose';
import { responseStatus } from '../../../configs/resStatus.config';
import { Favorite } from '../../../dataBase/favorite.db';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import restaurantService from '../../restaurant/restaurant.service';

export const checkIfRestaurantExists = errorWrapper(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const data: Favorite = req.locals.favoriteData;

    if (!isObjectIdOrHexString(data._restaurant_id)) {
      throw new APIError(
        'restaurantId is not an ObjectId type!',
        responseStatus.BAD_REQUEST
      );
    }

    const restaurant = await restaurantService.findRestaurant(
      data._restaurant_id.toString()
    );

    if (!restaurant) {
      throw new APIError(
        'Restaurant cannot be added, because does not exist!\n Check restaurantId what is sent into body.',
        responseStatus.BAD_REQUEST
      );
    }

    next();
  }
);

import { NextFunction, Response } from 'express';

import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import restaurantService from '../restaurant.service';

export const getResById = errorWrapper(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { restaurantId } = req.params;

    const restaurant = await restaurantService.findRestaurant(restaurantId);

    if (!restaurant) {
      throw new APIError(
        "Restaurant with that ID doesn't exists.",
        responseStatus.BAD_REQUEST
      );
    }

    req.restaurant = restaurant;

    next();
  }
);

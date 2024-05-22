import { Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import restaurantService from '../restaurant.service';

export const returnAllRests = errorWrapper(
  async (req: IRequest, res: Response) => {
    const paginationOptions = req.locals?.validatedPagination;

    const response = await restaurantService.findAllRestaurants(
      paginationOptions
    );

    res.status(responseStatus.OK).json(response);
  }
);

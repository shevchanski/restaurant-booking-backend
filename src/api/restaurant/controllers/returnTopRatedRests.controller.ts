import { Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import restaurantService from '../restaurant.service';

export const returnTopRatedRests = errorWrapper(
  async (req: IRequest, res: Response) => {
    const { topK } = req.locals;

    const topRated = await restaurantService.returnTopRated(topK);

    res.status(responseStatus.OK).json({ restaurants: topRated });
  }
);

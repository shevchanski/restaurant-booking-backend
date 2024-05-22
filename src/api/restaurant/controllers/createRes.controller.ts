import { Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import restaurantService from '../restaurant.service';

const createRes = errorWrapper(async (req: IRequest, res: Response) => {
  const validatedResObject = req.locals?.validatedResObject;

  if (!validatedResObject || !Object.keys(validatedResObject).length) {
    throw new APIError(
      'Problems on the server side.',
      responseStatus.INTERNAL_ERROR
    );
  }

  const restaurant = await restaurantService.insertRestaurant(
    validatedResObject
  );

  res.status(responseStatus.CREATED).json({ restaurant });
});

export default createRes;

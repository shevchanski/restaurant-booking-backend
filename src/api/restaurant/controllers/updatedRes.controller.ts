import { Response } from 'express';

import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import restaurantService from '../restaurant.service';

export const updateRes = errorWrapper(async (req: IRequest, res: Response) => {
  const { restaurant } = req;
  const validatedResObject = req.locals?.validatedResObject;

  if (
    !restaurant ||
    !validatedResObject ||
    !Object.keys(validatedResObject).length
  ) {
    throw new APIError(
      'Missing restaurant object',
      responseStatus.INTERNAL_ERROR
    );
  }

  const response = await restaurantService.updateResWithObject(
    validatedResObject,
    restaurant
  );

  res.status(responseStatus.OK).json({ restaurant: response });
});

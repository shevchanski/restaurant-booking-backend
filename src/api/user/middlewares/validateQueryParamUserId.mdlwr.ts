import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';

import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import APIError from '../../../errors/APIError';
import { responseStatus } from '../../../configs/resStatus.config';

const validateQueryParamUserId = errorWrapper(
  (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    if (!userId || !mongoose.isValidObjectId(userId)) {
      throw new APIError('User id is not valid', responseStatus.BAD_REQUEST);
    }

    next();
  }
);

export default validateQueryParamUserId;

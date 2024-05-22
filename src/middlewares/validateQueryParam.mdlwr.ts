import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';

import { InstanceParam } from '../configs/global.config';
import { responseStatus } from '../configs/resStatus.config';
import APIError from '../errors/APIError';
import errorWrapper from '../errors/errorWrapper';
import { IRequest } from '../types/query.types';

export const validateQueryParam = (instanceParam: InstanceParam) =>
  errorWrapper((req: IRequest, res: Response, next: NextFunction) => {
    const param = req.params[instanceParam];

    if (!param || !mongoose.isValidObjectId(param)) {
      throw new APIError(
        `Param '${instanceParam}' is not valid`,
        responseStatus.BAD_REQUEST
      );
    }

    next();
  });

validateQueryParam;

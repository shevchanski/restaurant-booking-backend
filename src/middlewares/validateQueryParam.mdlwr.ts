import { NextFunction, Response } from 'express';

import { InstanceParam } from '../configs/global.config';
import { responseStatus } from '../configs/resStatus.config';
import APIError from '../errors/APIError';
import errorWrapper from '../errors/errorWrapper';
import { IRequest } from '../types/query.types';

export const validateQueryParam = (instanceParam: InstanceParam) =>
  errorWrapper((req: IRequest, res: Response, next: NextFunction) => {
    const param = req.params[instanceParam];

    // README  temporary disable validation param on ObjectId type. It is caused because i temporary use Clerk
    //  if (!param || !mongoose.isValidObjectId(param)) {
    if (!param) {
      throw new APIError(
        `Param '${instanceParam}' is not valid`,
        responseStatus.BAD_REQUEST
      );
    }

    next();
  });

validateQueryParam;

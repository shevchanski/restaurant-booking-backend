import { NextFunction, Response } from 'express';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import APIError from '../../../errors/APIError';
import { responseStatus } from '../../../configs/resStatus.config';
import { loginDataValidator } from '../auth.validator';

const validateLoginData = errorWrapper(
  (req: IRequest, res: Response, next: NextFunction) => {
    const loginData = req.body;

    if (!Object.keys(loginData).length) {
      throw new APIError('Login data is not given', responseStatus.BAD_REQUEST);
    }

    const { error, value: validatedLoginData } =
      loginDataValidator.validate(loginData);

    if (error) {
      throw new APIError(error.message, responseStatus.BAD_REQUEST);
    }

    //  req.locals = {
    //    ...req.locals,
    //    validatedLoginData
    //  };

    req.body = validatedLoginData;

    next();
  }
);

export default validateLoginData;

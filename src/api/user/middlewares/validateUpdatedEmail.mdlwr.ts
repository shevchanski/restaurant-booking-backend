import { NextFunction, Response } from 'express';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import { UpdatedEmailValidator } from '../user.validator';
import APIError from '../../../errors/APIError';
import { responseStatus } from '../../../configs/resStatus.config';

const validateUpdatedEmail = errorWrapper(
  (req: IRequest, res: Response, next: NextFunction) => {
    const { error, value: validatedEmail } = UpdatedEmailValidator.validate(
      req.body
    );

    if (error) {
      throw new APIError(error.message, responseStatus.BAD_REQUEST);
    }

    req.locals = {
      ...req.locals,
      validatedUserObject: validatedEmail
    };
    next();
  }
);

export default validateUpdatedEmail;

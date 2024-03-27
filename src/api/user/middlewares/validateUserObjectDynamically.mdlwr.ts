import { NextFunction, Response } from 'express';
import Joi from 'joi';

import { WellKnownErrorTypes } from '../../../configs/error.config';
import { responseStatus } from '../../../configs/resStatus.config';
import { UserValidationType } from '../../../configs/global.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import WellKnownError from '../../../errors/WellKnownError';
import {
  CreatedUserObjectValidator,
  UpdatedUserEmailObjectValidator,
  UpdatedUserObjectValidator
} from '../user.validator';
import { IRequest } from '../../../types/query.types';

const validateUserObjectDynamically = (
  userValidationType: UserValidationType
) =>
  errorWrapper((req: IRequest, res: Response, next: NextFunction) => {
    const dataToValidate = req.body;

    if (!Object.keys(dataToValidate).length) {
      throw new WellKnownError(WellKnownErrorTypes.BAD_REQUEST);
    }

    let dataValidator: Joi.ObjectSchema;

    switch (userValidationType) {
      case UserValidationType.CREATE_USER:
        dataValidator = CreatedUserObjectValidator;
        break;

      case UserValidationType.UPDATE_USER:
        dataValidator = UpdatedUserObjectValidator;
        break;

      case UserValidationType.UPDATE_EMAIL:
        dataValidator = UpdatedUserEmailObjectValidator;
        break;

      default:
        throw new APIError(
          'Validation option is not valid',
          responseStatus.BAD_REQUEST
        );
    }

    const { error, value: validatedUserData } =
      dataValidator.validate(dataToValidate);

    if (error) {
      throw new APIError(error.message, responseStatus.BAD_REQUEST);
    }

    req.locals = {
      ...req.locals,
      validatedUserData
    };

    next();
  });

export default validateUserObjectDynamically;

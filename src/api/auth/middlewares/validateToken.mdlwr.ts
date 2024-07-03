import { NextFunction, Response } from 'express';
import { isDocument } from '@typegoose/typegoose';

import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import { validateTokenDynamically } from '../auth.validator';
import { responseStatus } from '../../../configs/resStatus.config';
import { TokenTypes } from '../../../configs/global.config';
import authService from '../auth.service';
import APIError from '../../../errors/APIError';

const validateToken = (tokenType: TokenTypes) =>
  errorWrapper(async (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');

    const validatedToken = validateTokenDynamically(token, tokenType);

    const authorizedUser = await authService.findTokenWithUser({
      [tokenType === TokenTypes.ACCESS ? 'accessToken' : 'refreshToken']:
        validatedToken
    });

    if (!authorizedUser) {
      throw new APIError(
        'User is not authorized',
        responseStatus.NOT_AUTHORIZED
      );
    }

    if (!isDocument(authorizedUser.user)) {
      throw new APIError("User doesn't exists", responseStatus.BAD_REQUEST);
    }

    req.user = authorizedUser.user;

    next();
  });

export default validateToken;

import { NextFunction, Response } from 'express';

import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import passwordService from '../../../services/auth/password.service';
import { IRequest } from '../../../types/query.types';

const loginUserWithEmail = errorWrapper(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const validatedLoginData = req.body;
    const { user: currentUser } = req;

    if (!validatedLoginData?.password || !currentUser) {
      throw new APIError(
        'Necessary data is not provided',
        responseStatus.INTERNAL_ERROR
      );
    }

    await passwordService.comparePasswords(
      validatedLoginData.password,
      currentUser.password
    );

    next();
  }
);

export default loginUserWithEmail;

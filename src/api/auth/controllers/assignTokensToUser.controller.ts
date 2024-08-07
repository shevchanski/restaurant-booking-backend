import { Response } from 'express';

import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import tokenService from '../../../services/auth/token.service';
import { IRequest } from '../../../types/query.types';
import authService from '../auth.service';

const assignTokensToUser = errorWrapper(
  async (req: IRequest, res: Response) => {
    const user = req.user;

    if (!user) {
      throw new APIError(
        'Authenticate user is not given',
        responseStatus.INTERNAL_ERROR
      );
    }

    const createdTokenPair = tokenService.createTokenPair(user.toObject());

    const insertedTokens = await authService.insertTokenPair({
      ...createdTokenPair,
      _user_id: user._id
    });

    res.status(responseStatus.CREATED).json({ tokens: insertedTokens, user });
  }
);

export default assignTokensToUser;

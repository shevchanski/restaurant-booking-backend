import jwt from 'jsonwebtoken';

import { IUser } from '../types/user.types';
import { TokenConfig } from '../configs/global.config';
import { TokenPair } from '../types/global.types';
import APIError from '../errors/APIError';
import { responseStatus } from '../configs/resStatus.config';

function createTokenPair(tokenPayload: IUser): TokenPair {
  if (typeof tokenPayload !== 'object' || tokenPayload === null) {
    throw new APIError('Token payload is required', responseStatus.BAD_REQUEST);
  }

  const accessToken = jwt.sign(tokenPayload, TokenConfig.ACCESS_SECRET, {
    //  expiresIn: '2m' // this expiration time is used to test correct work
    expiresIn: '2d'
  });
  const refreshToken = jwt.sign(tokenPayload, TokenConfig.REFRESH_SECRET, {
    //  expiresIn: '30m' // this expiration time is used to test correct work
    expiresIn: '30d'
  });

  return { accessToken, refreshToken };
}

export default { createTokenPair };
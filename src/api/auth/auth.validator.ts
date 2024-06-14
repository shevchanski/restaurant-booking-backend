import Joi from 'joi';

import {
  PasswordRegex,
  TokenRegex,
  TokenTypes
} from '../../configs/global.config';
import { responseStatus } from '../../configs/resStatus.config';
import APIError from '../../errors/APIError';
import tokenService from '../../services/auth/token.service';

const loginDataValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().regex(PasswordRegex)
});

const TokenValidator = Joi.string()
  .replace('Bearer ', '')
  .regex(TokenRegex)
  .required();

function validateTokenDynamically(
  token: string | undefined,
  tokenType: TokenTypes = TokenTypes.ACCESS
) {
  if (!token || !token.startsWith('Bearer ')) {
    throw new APIError('Token type is not valid', responseStatus.BAD_REQUEST);
  }

  const { error, value: validatedToken } = TokenValidator.validate(token);

  if (error) {
    throw new APIError(error.message, responseStatus.BAD_REQUEST);
  }

  tokenService.verifyToken(validatedToken, tokenType);

  return validatedToken;
}

export { TokenValidator, loginDataValidator, validateTokenDynamically };

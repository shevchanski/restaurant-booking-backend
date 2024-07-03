import validateLoginData from './validateLoginData.mdlwr';
import loginUserWithEmail from './loginUserWithEmail.mdlwr';
import validateToken from './validateToken.mdlwr';
import { TokenTypes } from '../../../configs/global.config';

const authorizeUser = validateToken(TokenTypes.ACCESS);

export default {
  validateLoginData,
  loginUserWithEmail,
  validateToken,
  authorizeUser
};

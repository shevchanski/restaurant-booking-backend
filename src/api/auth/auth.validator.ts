import Joi from 'joi';

import { PasswordRegex } from '../../configs/global.config';

const loginDataValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().regex(PasswordRegex)
});

export { loginDataValidator };

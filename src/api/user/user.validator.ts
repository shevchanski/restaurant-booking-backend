import joi from 'joi';
import { IUser } from '../../types/user.types';

const userObjectValidator = joi.object<IUser, true, IUser>({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(8).max(20)
});

export { userObjectValidator };

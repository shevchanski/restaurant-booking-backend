import joi from 'joi';
import { IUser } from '../../types/user.types';
import { PasswordRegex } from '../../configs/global.config';

const UpdatedUserObjectValidator = joi.object<
  Omit<IUser, 'email' | 'password'>,
  true,
  Omit<IUser, 'email' | 'password'>
>({
  firstName: joi
    .string()
    .required()
    .regex(/^[A-Z][a-z]+/),
  lastName: joi
    .string()
    .required()
    .regex(/^[A-Z][a-z]+/)
});

const CreatedUserObjectValidator = UpdatedUserObjectValidator.append<
  IUser,
  IUser
>({
  email: joi.string().email().required().lowercase(),
  password: joi.string().required().regex(PasswordRegex)
});

const UpdatedEmailValidator = joi.object({
  email: joi.string().required().email()
});

export {
  UpdatedUserObjectValidator,
  CreatedUserObjectValidator,
  UpdatedEmailValidator
};

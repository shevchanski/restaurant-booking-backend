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

const PasswordValidator = joi.string().required().regex(PasswordRegex);

const EmailValidator = joi.string().email().required().lowercase();

const CreatedUserObjectValidator = UpdatedUserObjectValidator.append<
  IUser,
  IUser
>({
  email: EmailValidator,
  password: PasswordValidator
});

const UpdatedUserEmailObjectValidator = joi.object({
  email: EmailValidator
});

const UpdatedUserPasswordValidator = joi.object({
  oldPassword: PasswordValidator,
  newPassword: PasswordValidator
});

export {
  UpdatedUserObjectValidator,
  CreatedUserObjectValidator,
  UpdatedUserEmailObjectValidator,
  UpdatedUserPasswordValidator
};

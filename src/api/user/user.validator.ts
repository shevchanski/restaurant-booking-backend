import joi from 'joi';
import { IUser } from '../../types/user.types';

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
  password: joi
    .string()
    .required()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/)
});

export { UpdatedUserObjectValidator, CreatedUserObjectValidator };

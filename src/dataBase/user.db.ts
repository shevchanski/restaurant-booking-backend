import { getModelForClass, prop } from '@typegoose/typegoose';
import { IUser } from '../types/user.types';

class User implements IUser {
  @prop()
  public firstName!: string;

  @prop()
  public lastName!: string;

  @prop()
  public email!: string;

  @prop()
  public password!: string;
}

const UserModel = getModelForClass(User);

export default UserModel;

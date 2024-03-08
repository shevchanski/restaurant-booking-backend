import { ReturnModelType, getModelForClass, prop } from '@typegoose/typegoose';
import { IUser } from '../types/user.types';
import passwordService from '../services/password.service';

class User implements IUser {
  @prop()
  public firstName!: string;

  @prop()
  public lastName!: string;

  @prop()
  public email!: string;

  @prop()
  public password!: string;

  public static async createUserWithHashedPassword(
    this: ReturnModelType<typeof User>,
    userObject: IUser
  ) {
    userObject.password = await passwordService.hashPassword(
      userObject.password
    );

    return this.create(userObject);
  }
}

const UserModel = getModelForClass(User);

export default UserModel;

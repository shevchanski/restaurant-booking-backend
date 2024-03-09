import { ReturnModelType, getModelForClass, prop } from '@typegoose/typegoose';
import { IUser } from '../types/user.types';
import passwordService from '../services/password.service';

class User implements IUser {
  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
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

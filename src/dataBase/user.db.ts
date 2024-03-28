import {
  DocumentType,
  ReturnModelType,
  getModelForClass,
  modelOptions,
  prop
} from '@typegoose/typegoose';

import { UserSecureFields } from '../configs/db.config';
import passwordService from '../services/password.service';
import { IUser } from '../types/user.types';

@modelOptions({
  schemaOptions: {
    toJSON: {
      virtuals: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      transform(doc, ret, options) {
        for (const fieldToDelete of UserSecureFields) {
          delete ret[fieldToDelete];
        }
      }
    },
    toObject: {
      virtuals: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      transform(doc, ret, options) {
        for (const fieldToDelete of UserSecureFields) {
          delete ret[fieldToDelete];
        }
      }
    }
  }
})
export class User implements IUser {
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

  public async comparePassword(
    this: DocumentType<User>,
    plainPassword: string
  ) {
    return passwordService.comparePasswords(plainPassword, this.password);
  }
}

const UserModel = getModelForClass(User);

export default UserModel;

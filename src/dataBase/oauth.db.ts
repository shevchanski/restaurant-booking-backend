import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from './user.db';
import { IOAuth } from '../types/oauth.types';

class OAuth implements IOAuth {
  @prop({
    type: () => User,
    required: true
  })
  public _user_id!: Ref<User>;

  @prop({ required: true })
  public accessToken!: string;

  @prop({ required: true })
  public refreshToken!: string;

  @prop({
    ref: () => User,
    foreignField: '_id',
    localField: '_user_id',
    justOne: true
  })
  public user!: Ref<User>;
}

const OAuthModel = getModelForClass(OAuth);

export default OAuthModel;

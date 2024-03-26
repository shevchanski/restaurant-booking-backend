import { Ref, getModelForClass, pre, prop } from '@typegoose/typegoose';
import { User } from './user.db';
import { IOAuth } from '../types/oauth.types';

// pre-hook which is used to populate user by _user_id at action 'findOne'
@pre<OAuth>('findOne', function () {
  this.populate('user');
})
class OAuth implements IOAuth {
  @prop({
    ref: () => User,
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
  public user?: Ref<User>;
}

const OAuthModel = getModelForClass(OAuth);

export default OAuthModel;

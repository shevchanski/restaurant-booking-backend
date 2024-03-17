import { Ref } from '@typegoose/typegoose';
import { User } from '../dataBase/user.db';

interface IOAuth {
  accessToken: string;
  refreshToken: string;
  _user_id: Ref<User>;
}

export { IOAuth };

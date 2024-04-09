import { Ref } from '@typegoose/typegoose';
import { User } from '../dataBase/user.db';

interface IOAuth {
  accessToken: string;
  refreshToken: string;
  _user_id: Ref<User>;
}

type TokenFindParams = {
  [key in keyof IOAuth]?: string;
};

export { IOAuth, TokenFindParams };

import OAuthModel from '../../dataBase/oauth.db';
import { IOAuth } from '../../types/oauth.types';

function insertTokenPair(tokenPair: IOAuth) {
  return OAuthModel.create(tokenPair);
}

export default { insertTokenPair };

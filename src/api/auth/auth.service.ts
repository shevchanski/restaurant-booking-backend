import OAuthModel from '../../dataBase/oauth.db';
import { IOAuth, TokenFindParams } from '../../types/oauth.types';

async function insertTokenPair(tokenPair: IOAuth) {
  const usersTokens = await OAuthModel.findOne({
    _user_id: tokenPair._user_id
  });

  if (!usersTokens) {
    return await OAuthModel.create(tokenPair);
  }

  usersTokens.accessToken = tokenPair.accessToken;
  usersTokens.refreshToken = tokenPair.refreshToken;
  usersTokens.save();

  return usersTokens;
}

function findTokenWithUser(findParams: TokenFindParams) {
  return OAuthModel.findOne(findParams);
}

export default { insertTokenPair, findTokenWithUser };

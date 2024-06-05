import FavoriteModel from '../dataBase/favorite.db';

export function getAllUsersIds() {
  return FavoriteModel.find({}, { _user_id: true });
}

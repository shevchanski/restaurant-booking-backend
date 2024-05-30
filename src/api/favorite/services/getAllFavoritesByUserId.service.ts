import FavoriteModel from '../../../dataBase/favorite.db';

export default function getAllFavoritesByUserId(userId: string) {
  return FavoriteModel.getAllFavorites(userId);
}

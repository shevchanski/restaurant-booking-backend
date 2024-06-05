import FavoriteModel from '../../../dataBase/favorite.db';

export default function getAllFavoritesByUserId(
  userId: string,
  returnOnlyRestsIds: boolean = false
) {
  return FavoriteModel.getAllFavorites(userId, returnOnlyRestsIds);
}

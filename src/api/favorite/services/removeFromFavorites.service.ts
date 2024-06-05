import FavoriteModel, { Favorite } from '../../../dataBase/favorite.db';

export default function removeFromFavorites(data: Favorite) {
  return FavoriteModel.deleteOne(data);
}

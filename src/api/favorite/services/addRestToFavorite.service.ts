import FavoriteModel, { Favorite } from '../../../dataBase/favorite.db';

export default function addRestToFavorite(data: Favorite) {
  const favorite = new FavoriteModel(data);
  return favorite.save();
}

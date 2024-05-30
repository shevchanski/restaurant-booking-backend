import FavoriteModel, { Favorite } from '../../../dataBase/favorite.db';

export default function findByParamObject(data: Favorite) {
  return FavoriteModel.findOne(data);
}

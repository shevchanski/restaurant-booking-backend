import RestaurantModel from '../dataBase/restaurant.db';

export function getRestsByIdsArray(restsIds: string[]) {
  return RestaurantModel.find({ _id: { $in: restsIds } });
}

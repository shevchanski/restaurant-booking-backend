import RestaurantModel from '../dataBase/restaurant.db';

export function getAllRestaurants() {
  return RestaurantModel.find();
}

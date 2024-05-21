import RestaurantModel, { Restaurant } from '../../dataBase/restaurant.db';

function insertRestaurant(restaurantObject: Restaurant) {
  const newRes = new RestaurantModel(restaurantObject);
  return newRes.save();
}

export default { insertRestaurant };

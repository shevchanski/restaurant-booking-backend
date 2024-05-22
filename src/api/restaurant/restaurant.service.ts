import { DocumentType } from '@typegoose/typegoose';
import RestaurantModel, { Restaurant } from '../../dataBase/restaurant.db';

function insertRestaurant(restaurantObject: Restaurant) {
  const newRes = new RestaurantModel(restaurantObject);
  return newRes.save();
}

function updateResWithObject(
  updatedResObject: Restaurant,
  resInstanceToUpdate: DocumentType<Restaurant>
) {
  resInstanceToUpdate.set(updatedResObject);
  return resInstanceToUpdate.save();
}

function findRestaurant(restaurantId: string) {
  return RestaurantModel.findById(restaurantId);
}

export default { insertRestaurant, updateResWithObject, findRestaurant };

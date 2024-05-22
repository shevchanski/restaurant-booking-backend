import { DocumentType } from '@typegoose/typegoose';

import { SortOption } from '../../configs/global.config';
import RestaurantModel, { Restaurant } from '../../dataBase/restaurant.db';
import { RestaurantPaginationOptions } from '../../types/restaurant.types';

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

async function findAllRestaurants(
  paginationOptions: RestaurantPaginationOptions
) {
  const {
    page = 1,
    perPage = 20,
    sortOption = SortOption.ASC,
    sortBy = 'title'
  } = paginationOptions;

  const docsToSkip = (page - 1) * perPage;

  const [foundRests, totalAmount] = await Promise.all([
    RestaurantModel.find()
      .skip(docsToSkip)
      .limit(perPage)
      .sort({ [sortBy]: sortOption === SortOption.ASC ? 1 : -1 }),
    RestaurantModel.countDocuments()
  ]);

  return {
    page,
    perPage,
    sortBy,
    sortOption,
    totalAmount,
    restaurants: foundRests
  };
}

export default {
  insertRestaurant,
  updateResWithObject,
  findRestaurant,
  findAllRestaurants
};

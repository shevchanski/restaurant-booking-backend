import RestaurantPhotoModel from '../dataBase/restaurant-photo.db';

function addRestPhoto(
  restaurantId: string,
  location: string,
  isDefault: boolean = false
) {
  return RestaurantPhotoModel.create({
    _restaurant_id: restaurantId,
    location,
    isDefault
  });
}

export { addRestPhoto };

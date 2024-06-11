import RestaurantPhotoModel from '../dataBase/restaurant-photo.db';

export default async function getRestPhotosById(restId: string) {
  const res = await RestaurantPhotoModel.find({
    _restaurant_id: restId,
    isDelete: false
  })
    .sort({ createdAt: -1 })
    .select({ location: 1, _id: 0 });

  return res.length ? res.map((photo) => photo.location) : [];
}

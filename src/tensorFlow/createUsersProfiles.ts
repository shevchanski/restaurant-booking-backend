// import * as tf from '@tensorflow/tfjs-node';
// import { Ref } from '@typegoose/typegoose';
//
// import getAllFavoritesByUserId from '../api/favorite/services/getAllFavoritesByUserId.service';
// import { Restaurant } from '../dataBase/restaurant.db';
//
// export async function createUsersProfiles(
//   usersIds: string[],
//   restaurantsFeatures: { [key: string]: number[] }
// ) {
//   const promisesArray: {
//     [key: string]: Promise<string[] | (Ref<Restaurant> | undefined)[]>;
//   } = usersIds.reduce((favoriteObject, user) => {
//     favoriteObject[user] = getAllFavoritesByUserId(user, true);
//
//     return favoriteObject;
//   }, {});
//
//   const usersFavorites: { [key: string]: string[] } = {};
//   for (const id in promisesArray) {
//     const favoriteArray = (await promisesArray[id]) as string[];
//
//     usersFavorites[id] = favoriteArray;
//   }
//
//   const usersProfiles: { [key: string]: number[] } = Object.entries(
//     usersFavorites
//   ).reduce((profiles, favorite) => {
//     const favoriteFeatures = favorite[1].map((rest_id) => {
//       return restaurantsFeatures[rest_id as string];
//     });
//
//     profiles[favorite[0]] = tf.tensor(favoriteFeatures).mean(0).arraySync();
//
//     return profiles;
//   }, {});
//
//   return { usersProfiles, usersFavorites };
// }

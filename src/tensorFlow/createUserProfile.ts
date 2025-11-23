// import * as tf from '@tensorflow/tfjs-node';
//
// import getAllFavoritesByUserId from "../api/favorite/services/getAllFavoritesByUserId.service";
//
// export async function createUserProfile(
//   usersId: string,
//   restaurantsFeatures: { [key: string]: number[] },
// ) {
//   const favorites = await getAllFavoritesByUserId(usersId, true);
//
//   const favoritesMap: number[][] = favorites.map(
//     (restId) => restaurantsFeatures[restId],
//   );
//
//   const userProfile = tf.tensor2d(favoritesMap).mean(0).arraySync() as number[];
//
//   return { userProfile, favoritesMap };
// }

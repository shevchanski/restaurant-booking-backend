// import * as tf from '@tensorflow/tfjs-node';
//
// import { getAllRestaurants } from '../services/db/getAllRestaurants.service';
// import { getAllUsersIds } from '../services/db/getAllUsersIds.service';
// import { createUserProfile } from './createUserProfile';
// import getRestFeatureEncoder from './getRestFeaturesEncoder';
//
// interface Map {
//   [key: string]: number[];
// }
//
// async function getRecommendations(userId: string, topK: number = 5) {
//   // getting all ids of users who have list of favorite restaurants
//   const allUsersIds = [
//     ...new Set((await getAllUsersIds()).map((user) => user._user_id))
//   ];
//
//   if (!allUsersIds.includes(userId)) {
//     // eslint-disable-next-line no-console
//     console.error(
//       `[RS-Model] - User with id: ${userId} doesn't have list of favorite restaurants.`
//     );
//     return [];
//   }
//
//   // list of all restaurants into DB
//   const allRestaurants = await getAllRestaurants();
//
//   //   getting encoder based on all possible features
//   const encodeRestaurantFeatures = getRestFeatureEncoder(allRestaurants);
//
//   //   declaration map of restaurants features
//   const restaurantFeaturesMap: Map = {};
//
//   //   encoding feature for every restaurant and storing into restaurantFeaturesMap:{[restId]: mapOfFeatures}
//   allRestaurants.map((rest) => {
//     restaurantFeaturesMap[rest._id.toString()] = encodeRestaurantFeatures(rest);
//   });
//
//   //   storing all restaurants ids
//   const restaurantsIds = Object.keys(restaurantFeaturesMap);
//
//   const { userProfile, favoritesMap } = await createUserProfile(
//     userId,
//     restaurantFeaturesMap
//   );
//
//   //   creating array with the same number of dimensions as favoritesMap
//   const userProfileArray: number[][] = [];
//
//   favoritesMap.map(() => {
//     userProfileArray.push(userProfile as number[]);
//   });
//
//   //   shuffling favoritesMap array between training
//   tf.util.shuffle(favoritesMap);
//
//   //   creating tensors with users profiles and favoured restaurants
//   const userTensor = tf.tensor2d(userProfileArray);
//   const favouredTensor = tf.tensor2d(favoritesMap);
//
//   //   creating model which will be used to create recommendations
//   const model = tf.sequential();
//
//   model.add(
//     tf.layers.dense({
//       inputShape: [userTensor.shape[1]],
//       units: 128,
//       activation: 'relu'
//     })
//   );
//   model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
//   model.add(
//     tf.layers.dense({ units: favouredTensor.shape[1], activation: 'sigmoid' })
//   );
//
//   model.compile({
//     optimizer: tf.train.adam(),
//     loss: tf.losses.meanSquaredError,
//     metrics: ['mse']
//   });
//
//   //   training model with existed data
//   await model.fit(userTensor, favouredTensor, {
//     epochs: 200,
//     verbose: 0,
//     validationSplit: 0.2
//     //  callbacks: {
//     //    onEpochEnd(epoch, logs) {
//     //      console.log(`Epoch ${epoch}: loss = ${logs ? logs.loss : ''}`);
//     //    }
//     //  }
//   });
//
//   //   creating tensor with user profile by user id
//   const oneUserTensor = tf.tensor2d([userProfile]);
//
//   //  getting similar restaurants based on user profile
//   const predict = model.predict(
//     oneUserTensor,
//     restaurantFeaturesMap
//   ) as tf.Tensor;
//
//   const predictions = predict.dataSync();
//
//   //  creating object with recommendations for user
//   const similarities = restaurantsIds.map((id, index) => ({
//     restaurant_id: id,
//     similarity: predictions[index]
//   }));
//
//   //   sorting recommendations by number of similarity
//   similarities.sort((a, b) => b.similarity - a.similarity);
//
//   //   await model.save('file://./model');
//   //   console.info('Model trained and saved.');
//
//   return [...similarities.slice(0, topK).map((s) => s.restaurant_id)];
// }
//
// export default getRecommendations;

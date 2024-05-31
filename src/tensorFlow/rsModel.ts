import * as tf from '@tensorflow/tfjs-node';

import { getAllRestaurants } from '../services/getAllRestaurants.service';
import { getAllUsersIds } from '../services/getAllUsersIds.service';
import { createUsersProfiles } from './createUsersProfiles';
import getRestFeatureEncoder from './getRestFeaturesEncoder';

interface Map {
  [key: string]: number[];
}

async function getRecommendations(userId: string, topK: number = 5) {
  // getting all ids of users who have list of favorite restaurants
  const allUsersIds = [
    ...new Set((await getAllUsersIds()).map((user) => user._user_id))
  ];

  if (allUsersIds.includes(userId)) {
    // eslint-disable-next-line no-console
    console.error(
      `[RS-Model] - User with id: ${userId} doesn't have list of favorite restaurants.`
    );
    return [];
  }

  // list of all restaurants into DB
  const allRestaurants = await getAllRestaurants();

  //   getting encoder based on all possible features
  const encodeRestaurantFeatures = getRestFeatureEncoder(allRestaurants);

  //   declaration map of restaurants features
  const restaurantFeaturesMap: Map = {};

  //   encoding feature for every restaurant and storing into restaurantFeaturesMap:{[restId]: mapOfFeatures}
  allRestaurants.map((rest) => {
    restaurantFeaturesMap[rest._id.toString()] = encodeRestaurantFeatures(rest);
  });

  //   storing all restaurants ids
  const restaurantsIds = Object.keys(restaurantFeaturesMap);

  //   getting profiles for users. They will be used to train model
  const { usersProfiles, usersFavorites } = await createUsersProfiles(
    allUsersIds,
    restaurantFeaturesMap
  );

  const userProfileArray: number[][] = [];

  //   string all users profiles into 2-dimensions array. It will be used to create tensor
  const favouredRestaurantsFeatures = Object.keys(usersFavorites).flatMap(
    (userId) => {
      return usersFavorites[userId].map((restId) => {
        userProfileArray.push(usersProfiles[userId]);
        return restaurantFeaturesMap[restId];
      });
    }
  );

  //   creating tensors with users profiles and favoured restaurants
  const userTensor = tf.tensor2d(Object.values(userProfileArray));
  const favouredTensor = tf.tensor2d(favouredRestaurantsFeatures);

  //   creating model which will be used to create recommendations
  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      inputShape: [userTensor.shape[1]],
      units: 128,
      activation: 'relu'
    })
  );
  model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
  model.add(
    tf.layers.dense({ units: favouredTensor.shape[1], activation: 'sigmoid' })
  );

  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse']
  });

  //   training model with existed data
  await model.fit(userTensor, favouredTensor, {
    epochs: 200,
    validationSplit: 0.2
    //  callbacks: {
    //    onEpochEnd(epoch, logs) {
    //      console.log(`Epoch ${epoch}: loss = ${logs ? logs.loss : ''}`);
    //    }
    //  }
  });

  //   creating tensor with profile for user by id
  const oneUserTensor = tf.tensor2d([usersProfiles[userId]]);

  //  getting similar restaurants based on user profile
  const predict = model.predict(
    oneUserTensor,
    restaurantFeaturesMap
  ) as tf.Tensor;

  const predictions = predict.dataSync();

  //  creating object with recommendations for user
  const similarities = restaurantsIds.map((id, index) => ({
    restaurant_id: id,
    similarity: predictions[index]
  }));

  similarities.sort((a, b) => b.similarity - a.similarity);

  //   await model.save('file://./model');
  //   console.info('Model trained and saved.');

  return [...similarities.slice(0, topK).map((s) => s.restaurant_id)];
}

export default getRecommendations;

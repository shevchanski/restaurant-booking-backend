import { FilterQuery } from 'mongoose';
import { Restaurant } from '../dataBase/restaurant.db';

const generateSearchQuery = (searchingValue: string = '') => {
  const regexQuery = {
    $regex: searchingValue,
    $options: 'i'
  };

  const restaurantFilterObject: FilterQuery<Restaurant> = {
    $or: [
      {
        title: regexQuery
      },
      { cuisine: regexQuery },
      {
        'address.city': regexQuery
      },
      {
        'address.country': regexQuery
      },
      {
        'address.street_address': regexQuery
      }
    ]
  };

  return restaurantFilterObject;
};

export default generateSearchQuery;

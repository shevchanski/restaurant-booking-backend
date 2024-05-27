import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Restaurant } from '../dataBase/restaurant.db';
import { PaginationOptions } from './global.types';

interface RestaurantPaginationOptions extends PaginationOptions {
  sortBy: keyof Restaurant | keyof Base | 'createdAt'; // TODO find other way how to get keys of Restaurant-schema
}

export { RestaurantPaginationOptions };

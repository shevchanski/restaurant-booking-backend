import Joi from 'joi';

import RestaurantModel, { Restaurant } from '../../dataBase/restaurant.db';
import { RestaurantPaginationOptions } from '../../types/restaurant.types';
import { PaginationValidator } from '../../validators';

const RestObjectValidator = Joi.object<Restaurant>({
  title: Joi.string().required().trim(),
  description: Joi.string().optional().trim(),
  url: Joi.string().uri().optional().trim()
}).required();

const ResPaginationValidator =
  PaginationValidator.append<RestaurantPaginationOptions>({
    sortBy: Joi.string()
      .required()
      .valid(...Object.keys(RestaurantModel.schema.paths))
      .default('createdAt')
  });

export { ResPaginationValidator, RestObjectValidator };

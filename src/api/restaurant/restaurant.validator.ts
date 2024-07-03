import Joi from 'joi';

import { DEFAULT_PR_TOP_K } from '../../configs/global.config';
import RestaurantModel, {
  Address,
  Restaurant
} from '../../dataBase/restaurant.db';
import { RestaurantPaginationOptions } from '../../types/restaurant.types';
import { PaginationValidator } from '../../validators';

const AddressValidator = Joi.object<Address>({
  city: Joi.string().required().trim(),
  country: Joi.string().required().trim(),
  post_code: Joi.string().required().trim(),
  street_address: Joi.string().required().trim(),
  region: Joi.string().trim().optional().allow('')
});

const RestObjectValidator = Joi.object<Restaurant>({
  title: Joi.string().required().trim(),
  description: Joi.string().optional().trim().allow(''),
  website: Joi.string().uri().optional().trim().allow(''),
  address: AddressValidator,
  cuisine: Joi.array().items(Joi.string().required().trim()).required(),
  phoneNumber: Joi.string().required().trim()
}).required();

const ResPaginationValidator =
  PaginationValidator.append<RestaurantPaginationOptions>({
    sortBy: Joi.string()
      .required()
      .valid(...Object.keys(RestaurantModel.schema.paths))
      .default('createdAt')
  });

const PRQueryLimitValidator = Joi.object({
  limit: Joi.number()
    .integer()
    .optional()
    .positive()
    .min(1)
    .max(20)
    .default(DEFAULT_PR_TOP_K)
});

export { PRQueryLimitValidator, ResPaginationValidator, RestObjectValidator };

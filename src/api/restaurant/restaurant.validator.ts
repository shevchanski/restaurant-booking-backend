import Joi from 'joi';

import { Restaurant } from '../../dataBase/restaurant.db';

const RestObjectValidator = Joi.object<Restaurant>({
  title: Joi.string().required().trim(),
  description: Joi.string().optional().trim(),
  url: Joi.string().uri().optional().trim()
}).required();

export { RestObjectValidator };

import Joi from 'joi';

export const FavoriteDataValidator = Joi.object({
  restaurantId: Joi.string().required()
}).required();

export const GetFavoritesParamValidator = Joi.object({
  onlyIds: Joi.boolean().required()
});

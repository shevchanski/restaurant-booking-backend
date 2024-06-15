import { Router } from 'express';

import { FavoriteSubroutes, InstanceParam } from '../../configs/global.config';
import { validateQueryParam } from '../../middlewares';
import {
  addFavorite,
  removeUserFavorite,
  returnUserFavorites
} from './controllers';
import {
  checkIfFavoured,
  checkIfRestaurantExists,
  validateFavoriteObject,
  validateGetFavoritesParam
} from './middlewares/';

const router = Router();

// POST methods
router.post(
  FavoriteSubroutes.BY_USER_ID,
  validateQueryParam(InstanceParam.USER_ID),
  validateFavoriteObject,
  checkIfRestaurantExists,
  checkIfFavoured('toAdd'),
  addFavorite
);

// GET methods
router.get(
  FavoriteSubroutes.BY_USER_ID,
  validateQueryParam(InstanceParam.USER_ID),
  validateGetFavoritesParam,
  returnUserFavorites
);

// DELETE methods
router.delete(
  FavoriteSubroutes.BY_USER_ID,
  validateQueryParam(InstanceParam.USER_ID),
  validateFavoriteObject,
  checkIfFavoured('toDelete'),
  removeUserFavorite
);

export default router;

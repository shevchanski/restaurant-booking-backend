import { Router } from 'express';
import {
  FavoriteSubroutes,
  InstanceParam,
  UserSubroutes
} from '../../configs/global.config';
import { validateQueryParam } from '../../middlewares';
import {
  addFavorite,
  removeUserFavorite,
  returnUserFavorites
} from './controllers';
import {
  checkIfFavoured,
  checkIfRestaurantExists,
  validateFavoriteObject
} from './middlewares/';

const router = Router();

// POST methods
router.post(
  FavoriteSubroutes.ROOT,
  validateFavoriteObject,
  checkIfRestaurantExists,
  checkIfFavoured('toAdd'),
  addFavorite
);

// GET methods
router.get(
  UserSubroutes.BY_USER_ID,
  validateQueryParam(InstanceParam.USER_ID),
  returnUserFavorites
);

// DELETE methods
router.delete(
  FavoriteSubroutes.ROOT,
  validateFavoriteObject,
  checkIfFavoured('toDelete'),
  removeUserFavorite
);

export default router;

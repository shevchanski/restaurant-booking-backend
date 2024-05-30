import { Router } from 'express';
import {
  FavoriteSubroutes,
  InstanceParam,
  UserSubroutes
} from '../../configs/global.config';
import { validateQueryParam } from '../../middlewares';
import { addFavorite, returnUserFavorites } from './controllers';
import {
  checkIfRestaurantExists,
  validateFavoriteObject
} from './middlewares/';

const router = Router();

// POST methods
router.post(
  FavoriteSubroutes.ROOT,
  validateFavoriteObject,
  checkIfRestaurantExists,
  addFavorite
);

// GET methods
router.get(
  UserSubroutes.BY_USER_ID,
  validateQueryParam(InstanceParam.USER_ID),
  returnUserFavorites
);

export default router;

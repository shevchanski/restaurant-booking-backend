import express from 'express';

import { InstanceParam, ResSubroutes } from '../../configs/global.config';
import { validateQueryParam } from '../../middlewares';
import {
  createRes,
  returnAllRests,
  returnRes,
  returnTopRatedRests,
  returnUserRecommendations,
  updateRes
} from './controllers';
import {
  checkIfUserHasFavorites,
  getResById,
  validatePRLimit,
  validateResPagination,
  validatedResObject
} from './middlewares/';

const router = express.Router();

// [THOUGHTS] think about checking duplicate with geo-location
// POST methods
router.post(ResSubroutes.ROOT, validatedResObject, createRes);

// GET methods
router.get(ResSubroutes.ROOT, validateResPagination, returnAllRests);

router.get(ResSubroutes.TOP_RATED, validatePRLimit, returnTopRatedRests);

router.get(
  ResSubroutes.PERSONAL,
  validateQueryParam(InstanceParam.USER_ID),
  checkIfUserHasFavorites,
  validatePRLimit,
  returnUserRecommendations
);

router.get(
  ResSubroutes.BY_RES_ID,
  validateQueryParam(InstanceParam.RES_ID),
  getResById,
  returnRes
);

// PUT methods
router.put(
  ResSubroutes.BY_RES_ID,
  validateQueryParam(InstanceParam.RES_ID),
  validatedResObject,
  getResById,
  updateRes
);

export default router;

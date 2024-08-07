import express from 'express';

import { InstanceParam, ResSubroutes } from '../../configs/global.config';
import { validateQueryParam } from '../../middlewares';
import { cacheService } from '../../services/cache';
import {
  createRes,
  returnAllRests,
  returnRes,
  returnRestPhotos,
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
router.get(
  ResSubroutes.ROOT,
  validateResPagination,
  cacheService.addToCache('30 minutes'),
  returnAllRests
);

router.get(
  ResSubroutes.TOP_RATED,
  validatePRLimit,
  cacheService.addToCache(),
  returnTopRatedRests
);

router.get(
  ResSubroutes.PERSONAL,
  validateQueryParam(InstanceParam.USER_ID),
  checkIfUserHasFavorites,
  validatePRLimit,
  returnUserRecommendations
);

router.get(
  ResSubroutes.REST_PHOTOS_BY_ID,
  validateQueryParam(InstanceParam.RES_ID),
  cacheService.addToCache(),
  getResById,
  returnRestPhotos
);

router.get(
  ResSubroutes.BY_RES_ID,
  validateQueryParam(InstanceParam.RES_ID),
  cacheService.addToCache(),
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

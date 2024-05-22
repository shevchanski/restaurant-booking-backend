import express from 'express';

import { InstanceParam, ResSubroutes } from '../../configs/global.config';
import { validateQueryParam } from '../../middlewares';
import { createRes, returnAllRests, returnRes, updateRes } from './controllers';
import {
  getResById,
  validateResPagination,
  validatedResObject
} from './middlewares/';

const router = express.Router();

// [THOUGHTS] think about checking duplicate with geo-location
router.post(ResSubroutes.ROOT, validatedResObject, createRes);

router.get(ResSubroutes.ROOT, validateResPagination, returnAllRests);

router.put(
  ResSubroutes.BY_RES_ID,
  validateQueryParam(InstanceParam.RES_ID),
  validatedResObject,
  getResById,
  updateRes
);

router.get(
  ResSubroutes.BY_RES_ID,
  validateQueryParam(InstanceParam.RES_ID),
  getResById,
  returnRes
);

export default router;

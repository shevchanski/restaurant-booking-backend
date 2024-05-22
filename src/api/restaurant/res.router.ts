import express from 'express';

import { InstanceParam, ResSubroutes } from '../../configs/global.config';
import { validateQueryParam } from '../../middlewares';
import { createRes, updateRes } from './controllers';
import { getResById, validatedResObject } from './middlewares/';

const router = express.Router();

// [THOUGHTS] think about checking duplicate with geo-location
router.post(ResSubroutes.ROOT, validatedResObject, createRes);

router.put(
  ResSubroutes.BY_RES_ID,
  validateQueryParam(InstanceParam.RES_ID),
  validatedResObject,
  getResById,
  updateRes
);

export default router;

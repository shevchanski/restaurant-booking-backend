import express from 'express';

import { ResSubroutes } from '../../configs/global.config';
import createRes from './controllers/createRes.controller';
import validatedResObject from './middlewares/validateResObject.mdlwr';

const router = express.Router();

// [THOUGHTS] think about checking duplicate with geo-location
router.post(ResSubroutes.ROOT, validatedResObject, createRes);

export default router;

import { Router } from 'express';
import { FileSubroutes, InstanceParam } from '../../configs/global.config';
import { validateQueryParam } from '../../middlewares';
import { uploadRestPhoto } from './controllers/';
import { validateFile } from './middlewares';

const router = Router();

router.post(
  FileSubroutes.REST_PHOTO,
  validateQueryParam(InstanceParam.RES_ID),
  validateFile,
  uploadRestPhoto
);

export default router;

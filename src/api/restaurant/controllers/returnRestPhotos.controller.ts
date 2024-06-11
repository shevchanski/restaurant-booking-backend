import { Response } from 'express';
import { InstanceParam } from '../../../configs/global.config';
import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import getRestPhotosById from '../../../services/getRestPhotosById.service';
import { IRequest } from '../../../types/query.types';

export const returnRestPhotos = errorWrapper(
  async (req: IRequest, res: Response) => {
    const restId = req.params[InstanceParam.RES_ID];

    const photos = await getRestPhotosById(restId);

    res.status(responseStatus.OK).json({ photos, _restaurant_id: restId });
  }
);

import { Response } from 'express';
import { EntityType, InstanceParam } from '../../../configs/global.config';
import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import { addRestPhoto } from '../../../services/rest_photo_db.service';
import uploadFileToS3Bucket from '../../../services/s3.service';
import { IRequest } from '../../../types/query.types';

export const uploadRestPhoto = errorWrapper(
  async (req: IRequest, res: Response) => {
    const { fileToUpload } = req.locals;
    const restId = req.params[InstanceParam.RES_ID];

    const uploadResponse = await uploadFileToS3Bucket(
      fileToUpload,
      EntityType.RESTAURANTS,
      restId
    );

    await addRestPhoto(restId, uploadResponse.Location);

    res.status(responseStatus.CREATED).end();
  }
);

import { NextFunction, Response } from 'express';
import { WellKnownErrorTypes } from '../../../configs/error.config';
import { BYTE_SIZE } from '../../../configs/global.config';
import { responseStatus } from '../../../configs/resStatus.config';
import { FileUploadConfig } from '../../../configs/s3.config';
import APIError from '../../../errors/APIError';
import WellKnownError from '../../../errors/WellKnownError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import isUploadedFileType from '../../../utils/isUploadedFile';

export const validateFile = errorWrapper(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const fileToUpload = req.files?.restaurant_photo;

    if (!fileToUpload) {
      throw new WellKnownError(WellKnownErrorTypes.BAD_REQUEST);
    }

    if (!isUploadedFileType(fileToUpload)) {
      throw new APIError(
        'Only single file can be uploaded',
        responseStatus.BAD_REQUEST
      );
    }

    if (fileToUpload.size > FileUploadConfig.MAX_FILE_SIZE) {
      throw new APIError(
        `Size of file is over than ${
          FileUploadConfig.MAX_FILE_SIZE / BYTE_SIZE / BYTE_SIZE
        }MB`,
        responseStatus.BAD_REQUEST
      );
    }

    if (!FileUploadConfig.FILE_TYPES.includes(fileToUpload.mimetype)) {
      throw new APIError(
        `Allowed to upload only next file types: [${FileUploadConfig.FILE_TYPES.join(
          ', '
        )}]`,
        responseStatus.BAD_REQUEST
      );
    }

    req.locals = {
      ...req.locals,
      fileToUpload
    };

    next();
  }
);

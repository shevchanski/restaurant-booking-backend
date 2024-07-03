import { Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';

export const returnRes = errorWrapper((req: IRequest, res: Response) => {
  const { restaurant } = req;

  res.status(responseStatus.OK).json({ restaurant });
});

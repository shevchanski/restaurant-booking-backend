import { Response } from 'express';

import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import getRecommendations from '../../../tensorFlow/rsModel';
import { IRequest } from '../../../types/query.types';

export const returnUserRecommendations = errorWrapper(
  async (req: IRequest, res: Response) => {
    const { userId, topK } = req.locals;

    const recommendations = await getRecommendations(userId, topK);

    res.status(responseStatus.OK).json({ recommendations });
  }
);

import { Response } from 'express';

import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import { getRestsByIdsArray } from '../../../services/db/getRestsByIdsArray.service';
import getRecommendations from '../../../tensorFlow/rsModel';
import { IRequest } from '../../../types/query.types';

export const returnUserRecommendations = errorWrapper(
  async (req: IRequest, res: Response) => {
    const { userId, topK } = req.locals;

    const idsArray = await getRecommendations(userId, topK);

    const recommendations = await getRestsByIdsArray(idsArray);

    res.status(responseStatus.OK).json({ recommendations });
  }
);

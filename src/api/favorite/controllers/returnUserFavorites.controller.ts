import { Response } from 'express';
import { InstanceParam } from '../../../configs/global.config';
import { responseStatus } from '../../../configs/resStatus.config';
import APIError from '../../../errors/APIError';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import favoriteService from '../services';

export const returnUserFavorites = errorWrapper(
  async (req: IRequest, res: Response) => {
    // grouping user favorite with diff query param by url without param
    req.apicacheGroup = req.originalUrl.split('?')[0];

    const userId = req.params[InstanceParam.USER_ID];
    const { onlyIds } = req.locals;

    if (!userId || typeof userId !== 'string') {
      throw new APIError('No userId', responseStatus.BAD_REQUEST);
    }

    const favorites = await favoriteService.getAllFavoritesByUserId(
      userId,
      onlyIds
    );

    res.status(responseStatus.OK).json({ favorites });
  }
);

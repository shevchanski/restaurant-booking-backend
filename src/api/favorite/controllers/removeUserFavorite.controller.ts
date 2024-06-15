import { Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import { Favorite } from '../../../dataBase/favorite.db';
import errorWrapper from '../../../errors/errorWrapper';
import { cacheService } from '../../../services/cache';
import { IRequest } from '../../../types/query.types';
import favoriteService from '../services';

export const removeUserFavorite = errorWrapper(
  async (req: IRequest, res: Response) => {
    cacheService.deleteCache(req.originalUrl);

    const data: Favorite = req.locals?.favoriteData;

    await favoriteService.removeFromFavorites(data);

    res.status(responseStatus.OK).end();
  }
);

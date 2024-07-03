import { Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import { cacheService } from '../../../services/cache';
import { IRequest } from '../../../types/query.types';
import favoriteService from '../services/';

export const addFavorite = errorWrapper(
  async (req: IRequest, res: Response) => {
    cacheService.deleteCache(req.originalUrl);

    const favoriteData = req.locals?.favoriteData;

    await favoriteService.addRestToFavorite(favoriteData);

    res.status(responseStatus.CREATED).end();
  }
);

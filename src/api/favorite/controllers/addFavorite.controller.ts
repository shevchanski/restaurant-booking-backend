import { Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import favoriteService from '../services/';

export const addFavorite = errorWrapper(
  async (req: IRequest, res: Response) => {
    const favoriteData = req.locals?.favoriteData;

    await favoriteService.addRestToFavorite(favoriteData);

    res.status(responseStatus.CREATED).end();
  }
);

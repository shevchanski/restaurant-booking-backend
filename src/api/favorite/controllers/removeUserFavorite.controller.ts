import { Response } from 'express';
import { responseStatus } from '../../../configs/resStatus.config';
import { Favorite } from '../../../dataBase/favorite.db';
import errorWrapper from '../../../errors/errorWrapper';
import { IRequest } from '../../../types/query.types';
import favoriteService from '../services';

export const removeUserFavorite = errorWrapper(
  async (req: IRequest, res: Response) => {
    const data: Favorite = req.locals?.favoriteData;

    await favoriteService.removeFromFavorites(data);

    res.status(responseStatus.OK).end();
  }
);

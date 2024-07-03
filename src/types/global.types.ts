import { NextFunction, Request, Response } from 'express';
import { SortOption } from '../configs/global.config';
/*eslint-disable @typescript-eslint/no-explicit-any */
type MdlwrCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | any;

type ControllerCallbeck = (req: Request, res: Response) => Promise<any> | any;

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

interface PaginationOptions {
  page: number;
  perPage: number;
  sortOption: SortOption;
  searchTerm: string;
}

export { ControllerCallbeck, MdlwrCallback, PaginationOptions, TokenPair };

import { NextFunction, Request, Response } from 'express';
import { ErrorWrapperCallback } from '../types/error.types';

const errorWrapper =
  (callback: ErrorWrapperCallback) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await callback(req, res, next);
    } catch (e) {
      next(e);
    }
  };

export default errorWrapper;

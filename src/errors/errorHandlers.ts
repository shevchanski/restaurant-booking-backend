import { NextFunction, Request, Response } from 'express';
import errorWrapper from './errorWrapper';
import WellKnownError from './WellKnownError';
import { WellKnownErrorTypes } from '../configs/error.config';
import APIError from './APIError';

/*eslint-disable @typescript-eslint/no-unused-vars*/
const notFoundRouteHandler = errorWrapper(
  (req: Request, res: Response, next: NextFunction) => {
    throw new WellKnownError(WellKnownErrorTypes.NOT_FOUND);
  }
);

const globalErrorHandler = (
  error: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message: errorMessage, code, subCode } = error;
  res.status(code ?? 500).json({ errorMessage, subCode });
};

export { notFoundRouteHandler, globalErrorHandler };

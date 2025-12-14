import { NextFunction, Request, Response } from 'express';

import { WellKnownErrorTypes } from '../configs/error.config';
import { responseStatus } from '../configs/resStatus.config';
import APIError from './APIError';
import errorWrapper from './errorWrapper';
import WellKnownError from './WellKnownError';

const notFoundRouteHandler = errorWrapper(
  (_req: Request, _res: Response, _next: NextFunction) => {
    throw new WellKnownError(WellKnownErrorTypes.NOT_FOUND);
  },
);

const globalErrorHandler = (
  error: APIError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const {
    message: errorMessage,
    code = responseStatus.INTERNAL_ERROR,
    subCode,
  } = error;

  if (code >= responseStatus.INTERNAL_ERROR) {
    // biome-ignore lint/suspicious/noConsole: used to log internal errors
    console.error(error);
  }

  res.status(code).json({ errorMessage, subCode });
};

export { notFoundRouteHandler, globalErrorHandler };

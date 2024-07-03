import { NextFunction, Request, Response } from 'express';

export default function RouteLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // eslint-disable-next-line no-console
  console.log(`[Logger] - Request on route ${req.url} method ${req.method}`);

  next();
}

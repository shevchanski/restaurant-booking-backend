import { NextFunction, Request, Response } from "express";

export default function RouteLogger(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  // biome-ignore lint: this console is used to log the request made to API
  console.log(`[Logger] - Request on route ${req.url} method ${req.method}`);

  console.warn("some data");

  console.error("message error");

  next();
}

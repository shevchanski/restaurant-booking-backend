import { Request, Response, NextFunction } from 'express';
/*eslint-disable @typescript-eslint/no-explicit-any */
type MdlwrCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | any;

type ControllerCallbeck = (req: Request, res: Response) => Promise<any> | any;

export { MdlwrCallback, ControllerCallbeck };

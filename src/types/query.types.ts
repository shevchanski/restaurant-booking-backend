import { DocumentType } from '@typegoose/typegoose';
import { Request } from 'express';

import { Restaurant } from '../dataBase/restaurant.db';
import { User } from '../dataBase/user.db';

interface IRequest extends Request {
  //	this rule disabling is used, because we do not know exact type of data stored in prop 'locals'
  //	eslint-disable-next-line @typescript-eslint/no-explicit-any
  locals?: any;
  user?: DocumentType<User>;
  restaurant?: DocumentType<Restaurant>;
  apicacheGroup?: string;
}

export { IRequest };

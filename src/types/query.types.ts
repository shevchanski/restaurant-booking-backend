import { DocumentType } from '@typegoose/typegoose';
import { Request } from 'express';

import { User } from '../dataBase/user.db';

interface IRequest extends Request {
  //	this rule disabling is used, because we do not know exact type of data stored in prop 'locals'
  //	eslint-disable-next-line @typescript-eslint/no-explicit-any
  locals?: any;
  user?: DocumentType<User>;
}

export { IRequest };

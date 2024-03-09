import { DocumentType } from '@typegoose/typegoose';
import { User } from '../dataBase/user.db';

const MONGODB_SERVER_URI =
  process.env.MONGODB_SERVER_URI ?? 'mongodb://localhost:27017';

const DatabaseConfig = {
  MONGO_PROD_URI: `${MONGODB_SERVER_URI}/restaurantBooking`
};

// const UserSecureFields: Array<keyof Document | keyof IUser> = ['_id', 'password'];

// also can contain redundant/unnecessary field
const UserSecureFields: Array<keyof DocumentType<User>> = ['id', 'password'];

export { DatabaseConfig, UserSecureFields };

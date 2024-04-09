import { DocumentType } from '@typegoose/typegoose';
import { User } from '../dataBase/user.db';

const MONGODB_SERVER_URI =
  process.env.MONGODB_SERVER_URI ?? 'mongodb://localhost:27017';

const MONGODB_TEST_DB_URI =
  process.env.MONGO_TEST_DB_URI ?? 'mongodb://localhost:27017';

const DatabaseConfig = {
  MONGO_PROD_URI: `${MONGODB_SERVER_URI}/restaurantBooking`,
  MONGO_TEST_URI: `${MONGODB_TEST_DB_URI}/restaurantBooking_test`
};

// const UserSecureFields: Array<keyof Document | keyof IUser> = ['_id', 'password'];

// also can contain redundant/unnecessary field
const UserSecureFields: Array<keyof DocumentType<User>> = ['id', 'password'];

export { DatabaseConfig, UserSecureFields };

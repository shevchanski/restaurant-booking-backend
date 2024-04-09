import mongoose from 'mongoose';
import { DatabaseConfig } from '../configs/db.config';

beforeAll(async () => {
  await mongoose.connect(DatabaseConfig.MONGO_TEST_URI);
});

afterAll(async () => {
  const collectionArray = mongoose.connection.collections;

  for (const collection in collectionArray) {
    collectionArray[collection].deleteMany();
  }

  await mongoose.disconnect();
});

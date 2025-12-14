import { afterAll, beforeAll } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server-core';
import mongoose from 'mongoose';

// import { DatabaseConfig } from '../configs/db.config';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri(), { dbName: 'tablebar-test-db' });
});

afterAll(async () => {
  const collectionArray = mongoose.connection.collections;

  const promises = Object.values(collectionArray).map((collection) =>
    collection.deleteMany(),
  );

  await Promise.all(promises);

  await mongoose.disconnect();

  await mongoServer.stop();
});

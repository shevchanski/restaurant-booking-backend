/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import path from 'node:path';
import { DatabaseConfig } from '../configs/db.config';
import RestaurantModel from '../dataBase/restaurant.db';

function createRestaurantObject(listOfCuisine: string[]) {
  const resObject = {
    title: faker.company.name(),
    description: faker.lorem.paragraph({ min: 3, max: 8 }),
    website: faker.internet.url(),
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      post_code: faker.location.zipCode(),
      street_address: faker.location.streetAddress(true)
    },
    cuisine: faker.helpers.arrayElements(listOfCuisine, { min: 1, max: 3 }),
    rating: faker.number.float({ min: 0, max: 5, fractionDigits: 1 }),
    phoneNumber: faker.phone.number()
  };

  return resObject;
}

async function seedRestaurants(numberOfRestaurants: number = 50) {
  const cuisineFile = await readFile(
    path.join('.', 'src', 'constants', 'cuisine-without.json'),
    'utf-8'
  );

  const cuisineArray = JSON.parse(cuisineFile.toString());

  const restsList: Array<object> = [];

  for (let i = 0; i < numberOfRestaurants; i++) {
    restsList.push(createRestaurantObject(cuisineArray));
  }

  await RestaurantModel.insertMany(restsList);
}

async function dropAllCollections() {
  const collections = await mongoose.connection.listCollections();

  for (let i = 0; i < collections.length; i++) {
    await mongoose.connection.dropCollection(collections[i].name);
  }
}

async function main() {
  try {
    console.log(DatabaseConfig.MONGO_PROD_URI);

    await mongoose.connect(DatabaseConfig.MONGO_PROD_URI);

    await seedRestaurants(100);

    //  await dropAllCollections();

    await mongoose.disconnect();

    console.log('Seeded successfully');
  } catch (error) {
    console.error(
      'An error occurred while attempting to seed the database:',
      error
    );
  }
}

main();

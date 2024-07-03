import { faker } from '@faker-js/faker';

import { IUser } from '../../types/user.types';
import { CustomUserCredentials } from '../types/global.types';

function createFakeUser(
  customUserCredentials: CustomUserCredentials = {}
): IUser {
  const fakeUser: IUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  return { ...fakeUser, ...customUserCredentials };
}

export default createFakeUser;

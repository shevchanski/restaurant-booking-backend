import tokenService from '../../../services/auth/token.service';
import createFakeUser from '../../helpers/createFakeUser';
import { ExpectCallbackTest, TestObjectData } from '../../types/global.types';

const expectedTokenRegEx: RegExp =
  /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/;
const expectedTokenPairProps: Array<string> = ['accessToken', 'refreshToken'];

// defines function which will test function for throwing error if input data is not valid
const expectThrowError: ExpectCallbackTest = (functionToTest, input) => {
  const response = () => functionToTest(input);
  expect(response).toThrow('Token payload is required');
};

// defines function which will test necessary function with valid payload
const expectTokenObject: ExpectCallbackTest = async (functionToTest, input) => {
  const response = await functionToTest(input);

  expect(typeof response).toBe('object');
  for (const expectedProp of expectedTokenPairProps) {
    // this loop is used to check all expected props of returned token pair object
    expect(response).toHaveProperty(expectedProp);
  }
  expect(typeof response.accessToken).toBe('string');
  expect(typeof response.refreshToken).toBe('string');
  expect(response.refreshToken).toMatch(expectedTokenRegEx);
  expect(response.refreshToken).toMatch(expectedTokenRegEx);
};

// next var contains all possible input data to test expected behavior
const testData: TestObjectData[] = [
  {
    input: undefined,
    testOutput: expectThrowError
  },
  {
    input: null,
    testOutput: expectThrowError
  },
  {
    input: {},
    testOutput: expectTokenObject
  },
  {
    input: createFakeUser(),
    testOutput: expectTokenObject
  }
];

describe('Token service', () => {
  test('Create token pair', () => {
    for (const { input, testOutput } of testData) {
      testOutput(tokenService.createTokenPair, input);
    }
  });

  test('broken test', () => {
    expect(false).toBe(true);
  });
});

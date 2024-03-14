/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/src/__test__/env.setup.ts',
  setupFilesAfterEnv: ['<rootDir>/src/__test__/jest.setup.ts'],
  verbose: true,
  testMatch: ['**/__test__/**/?(*.)+(spec|test).[tj]s']
};

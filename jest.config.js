/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
};

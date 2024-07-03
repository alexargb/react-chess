const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      rootDir: '.',
      extensionsToTreatAsEsm: ['.ts', '.tsx'],
      testPathIgnorePatterns: ['coverage/*', 'node_modules/*'],
      collectCoverage: true,
      maxWorkers: 1,
      transform: {
        '^.+\\.ts?$': [
          'ts-jest',
          { useESM: true },
        ],
        '^.+\\.tsx?$': [
          'ts-jest',
          { useESM: true },
        ],
      },
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  },
};

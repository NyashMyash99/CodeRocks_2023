module.exports = {
  displayName: 'server',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  testRegex: '.*\\.integration.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'html'],
  globalSetup: '<rootDir>/jest.global-setup.ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.(t|j)s'],
  rootDir: '.',
};

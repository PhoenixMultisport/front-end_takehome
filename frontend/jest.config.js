module.exports = {
  preset: 'ts-jest',
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv:['<rootDir>/src/__test__/config/importJestDOM.ts'],
  transform: {},
};

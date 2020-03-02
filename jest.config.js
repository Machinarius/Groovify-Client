module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/setup_tests.ts"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/style_mock.js"
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ]
};
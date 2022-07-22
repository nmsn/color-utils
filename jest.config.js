/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

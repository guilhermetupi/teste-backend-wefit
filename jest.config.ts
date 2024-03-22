module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/adapters/(.*)$": "<rootDir>/src/adapters/$1",
    "^@/domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@/ports/(.*)$": "<rootDir>/src/ports/$1",
    "^@/config/(.*)$": "<rootDir>/src/config/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
  },
  transform: {
    "^.+\\.ts$": ["ts-jest"],
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};
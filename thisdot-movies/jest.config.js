const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  collectCoverage: false,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.js'],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
};

module.exports = createJestConfig(config);
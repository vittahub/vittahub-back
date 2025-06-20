const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};
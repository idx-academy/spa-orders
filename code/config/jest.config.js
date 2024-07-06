const path = require("path");

const esmDeps = require("./jest.esm.js");
const getConfigPath = (...paths) => path.join(__dirname, ...paths);

// Jest configuration
// https://jestjs.io/docs/en/configuration
module.exports = {
  // Enable DOM tests support
  testEnvironment: "jsdom",

  // Base URL for the jsdom environment
  testEnvironmentOptions: {
    url: "http://localhost"
  },

  roots: ["src"],

  rootDir: "../",

  preset: "ts-jest",

  testRegex: ".*[-.]test\\.[tj]sx?$",

  // Ignore the Yarn cache if present in the project's folder
  modulePathIgnorePatterns: ["<rootDir>/.yarn_cache", "<rootDir>/.stryker-tmp"],

  transform: {
    // Transform all js and jsx files with Babel
    "\\.(t|j)sx?$": path.join(__dirname, "jest.transformer.js")
  },

  // Do not transpile node_modules unless there are a ESM distributed
  // module
  transformIgnorePatterns: [`node_modules/(?!(${esmDeps.join("|")})/)`],

  // Code search paths
  modulePaths: ["<rootDir>/src/", "<rootDir>/test/"],

  setupFiles: [getConfigPath("jest.polyfills.js")],

  setupFilesAfterEnv: [
    getConfigPath("setup-tests.js"),
    // Configure React testing library support
    getConfigPath("jest.reacttesting.js")
  ],

  // Imported CSS/images mocks
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/config/__mocks__/fileMock.js",
    "\\.scss$": "identity-obj-proxy",
    // Alias @/ imports
    "@/(.*)": "<rootDir>/src/$1",
    // Alias #/ imports
    "#/(.*)": "<rootDir>/test/$1",
    // Alias config/ imports
    "@config/(.*)$": "<rootDir>/config/$1"
  },

  verbose: true,

  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true
  },

  // Do not create coverage reports by default. Use the --coverage CLI option to override it
  collectCoverage: false,

  // Dump the coverage reports into the "coverage" folder
  coverageDirectory: "coverage",

  // Project's path which coverage will be reported
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",

    //Stryker Exclusions:

    // General Exclusions
    "!src/{i18n,services,modules,types,constants}/**/*",
    "!src/**/module.*",
    "!src/**/modules.*",
    "!src/**/routes.*",
    "!src/**/types.*",

    // Specific Exclusions
    "!src/{main.{js,ts,jsx,tsx},polyfills.js}",
    "!src/{tools,icons,testing}/**/*",

    // Aligment with sonar-project.properties
    // "!**/@core/**.{ts,tsx}",

    // Test Exclusions
    "!src/{fixtures,test,__tests__,testing}/**/*",
    "!src/**/*.test.*",
    "!src/**/*.spec.*"
  ],

  // Generate coverage reports in textm HTML, lcov and clover format
  coverageReporters: ["text", "html", "lcov", "clover"],

  // Use the default and Sonar reporters
  reporters: ["default"],

  watchPathIgnorePatterns: ["<rootDir>/test-report.json"]
};

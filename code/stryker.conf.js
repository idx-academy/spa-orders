const path = require("path");

module.exports = {
  fileLogLevel: "trace",
  packageManager: "npm",
  tempDirName: "stryker-tmp",
  testRunner: "jest",
  tsconfigFile: "tsconfig.json",
  jest: {
    configFile: path.join(__dirname, "config/jest.config.js"),
    config: {
      rootDir: "."
    },
    enableFindRelatedTests: true
  },
  incremental: true,
  incrementalFile: "stryker-config/stryker-incremental.json",
  disableTypeChecks: true,
  mutate: [
    "src/**/*.ts?(x)",
    "!src/**/index.ts?(x)",
    "!src/**/selectors/*.ts?(x)",
    "!src/**/*@(.test|.spec|Spec).ts?(x)",
    "!src/{assets,messages,services,test-utils,types,store,routes}/**/*"
  ],
  ignoreStatic: true,
  reporters: ["clear-text", "progress", "html", "json"],
  coverageAnalysis: "perTest",
  timeoutMS: 600000,
  timeoutFactor: 6,
  concurrency: 8,
  cleanTempDir: true,
  jsonReporter: { fileName: "reports/stryker/stryker.json" },
  htmlReporter: { fileName: "reports/stryker/stryker.html" },
  checkerNodeArgs: ["--no-compilation-cache", "--max-old-space-size=8192"],
  testRunnerNodeArgs: ["--no-compilation-cache", "--max-old-space-size=8192"],
  logLevel: "info",
  mutator: {
    excludedMutations: ["StringLiteral", "ArrayDeclaration"]
  },
  dryRunTimeoutMinutes: 20
};

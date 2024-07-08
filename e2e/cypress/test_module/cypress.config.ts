import dotenv from "dotenv";
import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import addTestCoveragePlugin from "@cypress/code-coverage/task";
import addWebpackPreprocessorPlugin from "./cypress/plugins/addWebpackPreprocessorPlugin";
import path from "path";

const configFromEnv = dotenv.config({
  path: path.resolve(__dirname, ".env.local")
});

export default defineConfig({
  defaultCommandTimeout: 15000,
  e2e: {
    baseUrl: process.env.CLIENT_URL,
    async setupNodeEvents(on, config) {
      addWebpackPreprocessorPlugin(on, config);
      addTestCoveragePlugin(on, config);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    specPattern: "cypress/features/**/*.feature",
    supportFile: "cypress/support/index.ts"
  },
  env: {
    TAGS: "not @ignore",
    windowMode: "desktop",
    ...configFromEnv.parsed
  },
  execTimeout: 15000,
  pageLoadTimeout: 20000,
  retries: 2,
  screenshotsFolder: "results/screenshots",
  video: false,
  viewportHeight: 850,
  viewportWidth: 1280
});

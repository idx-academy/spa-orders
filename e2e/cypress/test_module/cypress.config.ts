import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";

export default defineConfig({
  defaultCommandTimeout: 15000,
  e2e: {
    // @ts-ignore
    apiBaseUrl: "http://localhost:3000/api",
    baseUrl: "http://localhost:3000",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      );
      return config;
    },
    specPattern: "cypress/features/**/*.feature",
    supportFile: "cypress/support/index.ts"
  },
  env: {
    TAGS: "not @ignore",
    windowMode: "desktop"
  },
  execTimeout: 15000,
  pageLoadTimeout: 20000,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "cypress/reporter-config.json"
  },
  retries: 2,
  screenshotsFolder: "results/screenshots",
  video: false,
  viewportHeight: 850,
  viewportWidth: 1280
});

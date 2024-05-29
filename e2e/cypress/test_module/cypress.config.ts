import { defineConfig } from "cypress";

import setupNodeEvents from "./cypress/plugins";

export default defineConfig({
  defaultCommandTimeout: 15000,
  e2e: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    apiBaseUrl: "http://localhost:3000/api",
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setupNodeEvents(on, config);
    },
    specPattern: "cypress/features/**/*.feature",
    supportFile: "cypress/support/index.ts",
  },
  env: {
    TAGS: "not @ignore",
    windowMode: "desktop",
  },
  execTimeout: 15000,
  pageLoadTimeout: 20000,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "cypress/reporter-config.json",
  },
  retries: 2,
  screenshotsFolder: "results/screenshots",
  video: false,
  viewportHeight: 850,
  viewportWidth: 1280,
});

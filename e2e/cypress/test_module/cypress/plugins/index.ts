import webpackPreprocessor from "@cypress/webpack-preprocessor";
import { fixCucumber } from "@cypress-e2e/config/fix-cucumber-report";

//Fix for screenshots on HTLM reports for Outline Scenarios
const fixCucumberReport = () => {
  const filePath = "node_modules/cypress-cucumber-preprocessor/lib/createTestFromScenario.js";

  return fixCucumber(filePath);
};

type CbType = (file: Cypress.FileObject) => string | Promise<string>;

export default (
  on: Cypress.PluginEvents,

  config: Cypress.PluginConfigOptions,
) => {
  fixCucumberReport();
  on(
    "file:preprocessor",

    webpackPreprocessor({
      // send in the options from your webpack.config.js, so it works the same as your app's code
      watchOptions: {},
      // eslint-disable-next-line global-require,node/global-require
      webpackOptions: require("../webpack.config"),
    }) as unknown as CbType,
  );
  return config;
};

import webpackPreprocessor from "@cypress/webpack-preprocessor";
import createWebpackConfig from "@cypress-e2e/webpack.config.js";

export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  const webpackOptions = createWebpackConfig(config);
  on("file:preprocessor", webpackPreprocessor({ webpackOptions }));
  return config;
};

import dotenv from "dotenv";

export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  const envConfig = dotenv.config();

  if (envConfig.error) {
    throw envConfig.error;
  }

  config.env = {
    ...config.env,
    ...envConfig.parsed
  };

  return config;
};

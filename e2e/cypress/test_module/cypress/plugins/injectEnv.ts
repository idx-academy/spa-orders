import dotenv from "dotenv";
import path from "path";

const ENV_FILE_PATH = path.resolve(__dirname, "../../.env.local");

export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  const envConfig = dotenv.config({ path: ENV_FILE_PATH });

  if (envConfig.error) {
    throw envConfig.error;
  }

  config.env = {
    ...config.env,
    ...envConfig.parsed
  };

  return config;
};

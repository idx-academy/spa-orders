const path = require("path");
const Dotenv = require("dotenv-webpack");
const baseConfig = require("./webpack.config");

module.exports = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    new Dotenv({
      path: path.join(__dirname, "..", ".env.test"),
      defaults: path.join(__dirname, "..", ".env"),
      systemvars: true
    })
  ]
};

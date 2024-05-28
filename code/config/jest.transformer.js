const path = require("node:path");

const babelJest = require("babel-jest").default;
const babelConfig = require(path.join(__dirname, "babel.config.js"));

// Custom Jest transformer.
// It uses babel-jest and the framework's babel configuration.
// It also provides support for the resolvers and aliases
// defined in the framework's webpack config.
module.exports = babelJest.createTransformer({
  ...babelConfig,
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        alias: {
          "@": "./src",
        },
      },
    ],
  ],
});

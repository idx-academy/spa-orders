const path = require("path");
const webpack = require("webpack");

const createConfig = (config) => {
  return {
    module: {
      rules: [
        {
          test: /\.feature$/,
          use: [
            {
              loader: "@badeball/cypress-cucumber-preprocessor/webpack",
              options: config
            }
          ]
        },
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
              plugins: ["babel-plugin-istanbul"]
            }
          }
        }
      ]
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "../../../../../", "src"),
        "@cypress-e2e": path.join(__dirname)
      },
      extensions: [".ts", ".js"],
      fallback: {
        child_process: "empty",
        fs: "empty",
        readline: "empty",
        path: require.resolve("path-browserify")
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser"
      })
    ]
  };
};

module.exports = createConfig;

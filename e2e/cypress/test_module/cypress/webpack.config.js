const path = require("path");

const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ],
      },
      {
        test: /\.feature$/,
        use: [
          {
            loader: "cypress-cucumber-preprocessor/loader",
          },
        ],
      },
      {
        test: /\.features$/,
        use: [
          {
            loader: "cypress-cucumber-preprocessor/lib/featuresLoader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "../../../../../", "src"),
      "@cypress-e2e": path.join(__dirname),
    },
    extensions: [".ts", ".js"],
    fallback: {
      child_process: "empty",
      fs: "empty",
      readline: "empty",
      path: require.resolve("path-browserify"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};

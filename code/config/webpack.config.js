// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/*
module.exports = {
  entry: path.join(__dirname, "..", "src", "main.tsx"),
  output: {
    path:path.resolve(__dirname, "dist"),
  },
  plugins: [
    // Combine all generated styles into a single bundle.css file
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    // Generate the index.html templates for the development server and SPA+Backend deployment
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: path.join(__dirname, "index.html"),
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /\.test\.tsx?$/],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.raw\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: require('mini-css-extract-plugin').loader, // eslint-disable-line global-require
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.join(__dirname, '..', 'src'),
    },
  },
  devServer: {
    port: 3000,
  },
};*/

module.exports = {
  entry: path.join(__dirname, "..", "src", "main.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html")
    }),
    new MiniCssExtractPlugin({ filename: "[name].css", ignoreOrder: true }),
    new Dotenv({
      path: path.join(__dirname, "..", ".env.local")
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../src/assets/icons/favicon.ico'), to: 'favicon.ico' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /\.test\.tsx?$/],
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: require("mini-css-extract-plugin").loader // eslint-disable-line global-require
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, "../node_modules/normalize-scss/sass")
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 8192
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.join(__dirname, "..", "src"),
      "@design-system": path.join(
        __dirname,
        "..",
        "src",
        "styles",
        "foundation",
        "_all.scss"
      )
    }
  },
  devServer: {
    port: 3000,
    historyApiFallback: true
  }
};

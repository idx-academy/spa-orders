// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    path:path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
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
        use: ['style-loader', 'css-loader'],
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
    ]
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
};

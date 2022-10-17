// webpack.config.js

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const prod = process.env.MODE === "production";

module.exports = {
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  mode: prod ? "production" : "development",
  devtool: prod ? "hidden-source-map" : "eval",
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new webpack.DefinePlugin({
      mode: process.env.MODE,
      port: process.env.PORT,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};

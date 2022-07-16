const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || "localhost";

// Required for babel-preset-react-app
process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  entry: resolveAppPath("src"),
  output: {
    filename: "static/js/bundle.js",
    publicPath: "/",
  },
  devServer: {
    compress: true,
    hot: true,
    host,
    port: 3000,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: resolveAppPath("src"),
        loader: "babel-loader",
        options: {
          presets: [require.resolve("babel-preset-react-app")],
        },
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: resolveAppPath("public/index.html"),
    // }),
  ],
};

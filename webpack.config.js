const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
const webpackRules = require("./webpackRules");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      types: path.resolve(__dirname, "src/types"),
      components: path.resolve(__dirname, "src/components"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "./index.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      ...webpackRules,
    ],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/auth": "http://localhost:3000",
    },
  },
  plugins: [
    new WorkerPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

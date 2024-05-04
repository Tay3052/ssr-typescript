const MiniCSS = require("mini-css-extract-plugin");
const path = require("path");
// const loader = require("sass-loader");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  entry: "./src/server/server.js", // エントリーポイント
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  externals: [nodeExternals()],
  mode: "development", // 開発 development モードまたは本番 production モード
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        // include: path.resolve(__dirname, "src/static/css"),
        use: [{ loader: MiniCSS.loader }, { loader: "css-loader" }],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/inline",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              // outputPath: "./static/media", // 出力先ディレクトリ
            },
          },
        ],
      },
    ],
  },
  plugins: [new MiniCSS()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

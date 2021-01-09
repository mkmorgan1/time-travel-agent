const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './react/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  watch: true,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        loader: ['style-loader', 'css-loader'] //MiniCssExtractPlugin.loader
      }
    ]
  }
  // plugins: [
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       { from: './react/assets', to: 'assets' }
  //     ]
  //   })
  // ]
}
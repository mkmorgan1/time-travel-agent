const path = require('path');

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
        loader: ['style-loader', 'css-loader']
      }
    ]
  }
}
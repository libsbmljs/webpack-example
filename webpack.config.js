const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [
      path.join(__dirname,'src'),
      path.join(__dirname,'node_modules','libsbmljs_stable')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^fs$/),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin([
      {from: '**/*.wasm', to: './', flatten: true}
    ]),
  ]
};

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'lodash', 'react', 'react-dom', 'react-redux', 'redux', 'redux-form', 'redux-promise', 'redux-thunk'
];

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        loaders: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/
      },
      {
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'sass-loader']
        }),
        exclude: /node_modules/,
        test: /\.scss$/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/style.[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor','manifest']
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false }
    })
  ]
};

module.exports = config;

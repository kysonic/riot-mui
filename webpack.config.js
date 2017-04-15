const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('styles/riot-mui.min.css');

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    test: /-min\.js$/
  }),
  extractSass
];

module.exports = {
  entry: {
    'riot-mui': './src/index',
    'riot-mui-min': './src/index',
  },
  output: {
    path: __dirname + '/build/',
    filename: 'js/[name].js'
  },
  plugins: plugins,
  devtool: false,
  module: {
    rules: [{
      test: /\.tag$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'riotjs-loader',
      query: {
        type: 'none'
      }
    }, {
      test: /\.js|\.tag|\.es6$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        query: {
          presets: ['es2015-riot']
        }
      }]
    }, {
      test: /\.scss$/,
      use: extractSass.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          query: {
            minimize: true
          }
        }, 'sass-loader']
      })
    }]
  },
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    inline: true
  }
};
'use strict';

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    'whatwg-fetch',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, './built'),
    publicPath: 'http://localhost:8080/',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      loader: 'ng-annotate!babel',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpg|jpeg)$/,
      loader: 'url?limit=5120'
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(gif|svg|woff|woff2|ttf|eot|otf)$/,
      loader: 'file'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/html-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'html'
    }, 
    // CSS LOADER
    // Reference: https://github.com/webpack/css-loader
    // Allow loading css through js
    //
    // Reference: https://github.com/postcss/postcss-loader
    // Postprocess your css with PostCSS plugins
      {
        test: /\.css$/,
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files in production builds
        //
        // Reference: https://github.com/webpack/style-loader
        // Use style-loader in development for hot-loading
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
    }, {
        test: /\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap'),
        includePaths: path.join(__dirname, 'src')
    }]
  },

  postcss: [
    autoprefixer({
        browsers: ['last 2 version']
    })
  ],

  plugins: [
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin('[name].[hash].css'),

    new HtmlWebpackPlugin({
      template: './index.html', 
      inject: 'head' // Inject all scripts into the body 
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { 
         NODE_ENV: JSON.stringify('production') 
       }
    })
  ],

  devtool: 'source-map',

  devServer: {
    contentBase: './built',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  }

};
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './scripts/main.js',
    canvas: './scripts/canvas.js',
    unsubscribe: './scripts/unsubscribe.js',
    loaddroplist: './scripts/loaddroplist.js',
    index_scripts: './scripts/index_scripts.js'
  },
  output: {
    filename: '[name].b.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].b.css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['main', 'canvas', 'loaddroplist', 'index_scripts']
    }),
    new HtmlWebpackPlugin({
      template: './unsub.html',
      filename: 'unsub.html',
      chunks: ['unsubscribe', 'main']
    }),
  ],
  mode: 'production'
};

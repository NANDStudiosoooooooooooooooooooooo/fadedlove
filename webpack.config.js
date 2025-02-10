const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './scripts/main.js',
    canvas: './scripts/canvas.js',
    unsubscribe: './scripts/unsubscribe.js',
    loaddroplist: './scripts/load_droplist.js',
    index_scripts: './scripts/index_scripts.js'
  },
  output: {
    filename: '[name].bundle.js',
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
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
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

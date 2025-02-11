const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    main: './scripts/main.js',
    canvas: './scripts/canvas.js',
    unsubscribe: './scripts/unsubscribe.js',
    loaddroplist: './scripts/loaddroplist.js',
    index_scripts: './scripts/index_scripts.js',
    gallery: './scripts/gallery.js',
    buttons: './scripts/buttons.js',
  },
  output: {
    filename: '[name].[contenthash].js',
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
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['main', 'canvas', 'loaddroplist', 'index_scripts'],
      inject: 'body',
      templateParameters: {
        logo: `
        <!--
               @@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@
        @@@@@@@@@@@@@@@@
        @@@@@@@@@@@
        @@@
        @@
              @@@@@@@@@@@@@@@@@@@
           @@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@
        @@@@@@@@
        @@@@@
        @@@
        @@@
        @@@             fadedcloth.de
        -->
        `
      },
    }),
    new HtmlWebpackPlugin({
      template: './unsub.html',
      filename: 'unsub.html',
      chunks: ['unsubscribe', 'main',  'buttons']
    }),
    new HtmlWebpackPlugin({
      template: './gallery.html',
      filename: 'gallery.html',
      chunks: ['main' , 'gallery', 'buttons']
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        format: {
          comments: (node, comment) => {
            return comment.value.includes('@');
          },
        },
      },
      extractComments: false,
    })],
  },
  mode: 'production'
};

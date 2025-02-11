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
    buttons: './scripts/load-buttons.js',
    loadupdates: './scripts/loadupdates.js',
    legal: './scripts/legal.js',
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
      chunks: ['canvas', 'loaddroplist', 'index_scripts', 'main'],
      scriptLoading: 'blocking',
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
      chunks: ['unsubscribe',  'buttons', 'main'],
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      template: './gallery.html',
      filename: 'gallery.html',
      chunks: [ 'gallery', 'buttons', 'main'],
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      template: './updates.html',
      filename: 'updates.html',
      chunks: ['loadupdates', 'buttons' , 'main'],
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      template: './legal.html',
      filename: 'legal.html',
      chunks: ['buttons', 'legal', 'main'],
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      template: './404.html',
      filename: '404.html',
      chunks: ['main'],
      scriptLoading: 'blocking',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        format: {
          comments: (node, comment) => {
            return comment.value.includes('fadedcloth.de');
          },
        },
      },
      extractComments: false,
    })],
  },
  mode: 'production'
};

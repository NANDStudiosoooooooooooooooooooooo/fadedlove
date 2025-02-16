const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

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
    subscribe: './scripts/subscribe.js',
    shop: './scripts/shop.js',
    item: './scripts/item.js',
    loadproduct: './scripts/load-product.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.umd\.js$/,
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
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['canvas', 'loaddroplist', 'index_scripts', 'main'],
      scriptLoading: 'blocking',
      chunksSortMode: 'manual',
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
      chunks: ['unsubscribe', 'buttons', 'main'],
      scriptLoading: 'blocking',
      chunksSortMode: 'manual',
    }),
    new HtmlWebpackPlugin({
      template: './lookbook.html',
      filename: 'lookbook.html',
      chunks: ['gallery', 'buttons', 'main'],
      scriptLoading: 'blocking',
      chunksSortMode: 'manual',
    }),
    new HtmlWebpackPlugin({
      template: './updates.html',
      filename: 'updates.html',
      chunks: ['loadupdates', 'buttons', 'main'],
      scriptLoading: 'blocking',
      chunksSortMode: 'manual',
    }),
    new HtmlWebpackPlugin({
      template: './legal.html',
      filename: 'legal.html',
      chunks: ['buttons', 'legal', 'main'],
      scriptLoading: 'blocking',
      chunksSortMode: 'manual',
    }),
    new HtmlWebpackPlugin({
      template: './404.html',
      filename: '404.html',
      chunks: ['main'],
      scriptLoading: 'blocking',
      chunksSortMode: 'manual',
    }),
    new HtmlWebpackPlugin({
      template: './item.html',
      filename: 'item.html',
      chunks: ['item', 'loadproduct', 'buttons', 'subscribe', 'main'],
      scriptLoading: 'blocking',
      chunksSortMode: 'manual',
    }),
    new HtmlWebpackPlugin({
      template: './shop.html',
      filename: 'shop.html',
      chunks: ['shop', 'buttons', 'subscribe', 'main'],
      scriptLoading: 'blocking',
      chunksSortMode: 'manual',
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    
  },
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

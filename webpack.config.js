const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { unsubscribe } = require('diagnostics_channel');

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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['main', 'canvas', 'loaddroplist', 'index-scripts'] // Füge alle Bundles hinzu
    }),
    new HtmlWebpackPlugin({
      template: './unsub.html',
      filename: 'unsub.html',
      chunks: ['unsubscribe', 'main'] // Füge nur das unsubscribe-Bundle hinzu
    }),
  ],
  mode: 'production'
};

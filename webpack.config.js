const path = require('path');

module.exports = {
  entry: './scripts/main.js', // Eintrittspunkt deines JavaScript
  output: {
    filename: 'bundle.js', // Name der Ausgabe-Datei
    path: path.resolve(__dirname, 'dist') // Ausgabe-Verzeichnis
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Regel für JavaScript-Dateien
        exclude: /node_modules/, // Schließe node_modules aus
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/, // Regel für CSS-Dateien
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  mode: 'production' // Setze den Modus auf 'production' für optimierte Builds
};

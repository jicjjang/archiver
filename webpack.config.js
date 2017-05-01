var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js'
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', 'electron')
  ],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["es2015"],
          plugins: ["transform-runtime"]
        }
      }
    ]
  }
}

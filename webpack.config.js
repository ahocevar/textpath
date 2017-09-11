const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  output: {
    filename: 'dist/textpath.js',
    library: "textPath"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: [
              'add-module-exports'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
};

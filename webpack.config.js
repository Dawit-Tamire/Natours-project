const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: '/public/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./public/js/index.js'],
  experiments: {
    topLevelAwait: true,
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './public/js/'),
    filename: 'bundle.js',
  },
};

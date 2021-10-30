/* eslint-disable node/no-unpublished-require */
const { DefinePlugin } = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// validate env
const env = require('./env');

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      API_HOST: `"${env.API_HOST}"`,
    }),
  ],
});

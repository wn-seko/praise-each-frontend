const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const API_URL = process.env.API_URL

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      API_URL: `"${API_URL}"`,
      MOCK_API: false,
    }),
  ],
})

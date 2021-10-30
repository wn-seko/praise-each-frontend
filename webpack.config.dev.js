/* eslint-disable node/no-process-env */
/* eslint-disable node/no-unpublished-require */
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

// validate env
const env = require('./env');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      API_HOST: `"${env.API_HOST}"`,
      OAUTH_LOGIN_URL: JSON.stringify({
        github: env.OAUTH_GITHUB,
        google: env.OAUTH_GOOGLE,
      }),
    }),
  ].concat(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: '.',
  },
  devtool: 'source-map',
});

/* eslint-disable node/no-unpublished-require */
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const ForkTsChecker = require('fork-ts-checker-webpack-plugin');

const env = require('./env');

const isProd = env.NODE_ENV === 'production';
const localIdentName = isProd ? '' : '[path][name]---[local]---[hash:base64:5]';

module.exports = {
  mode: 'development',
  entry: ['react-hot-loader/patch', 'react', 'react-dom', 'semantic-ui-react', './src/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      { enforce: 'pre', test: /\.tsx?$/, use: 'source-map-loader' },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          { loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader' },
          { loader: 'css-loader', options: { modules: { localIdentName } } },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [postcssNested, autoprefixer()];
              },
            },
          },
        ],
      },
      {
        test: /\.(ico|jpe?g|png|gif)$/,
        use: 'file-loader?name=[path][name].[ext]',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
      // favicon: 'src/assets/images/favicon.ico',
    }),
    new Copy({
      patterns: [
        { from: 'node_modules/normalize.css/normalize.css', to: 'assets/' },
        { from: 'node_modules/semantic-ui-css/semantic.min.css', to: 'assets/' },
        { from: 'node_modules/semantic-ui-css/themes/default/assets/', to: 'assets/themes/default/assets/' },
        { from: 'node_modules/react-dropdown/style.css', to: 'assets/react-dropdown.css' },
      ],
    }),
    new HtmlWebpackTagsPlugin({
      tags: ['assets/normalize.css', 'assets/semantic.min.css', 'assets/react-dropdown.css'],
      append: true,
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new ForkTsChecker(),
  ],
  performance: {
    maxEntrypointSize: 1000 * 1000,
    maxAssetSize: 800 * 1000,
  },
};

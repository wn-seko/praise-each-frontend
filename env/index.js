/* eslint-disable node/no-process-env */
// eslint-disable-next-line node/no-extraneous-require
const dotenv = require('dotenv');
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev' });

const { toNodeEnv, toString, toNumberOrUndefined, toStringOrUndefined } = require('./validator');

const envValidators = {
  NODE_ENV: toNodeEnv,
  API_HOST: toString,
  ANALYZE: toNumberOrUndefined,
  OAUTH_GITHUB: toStringOrUndefined,
  OAUTH_GOOGLE: toStringOrUndefined,
};

const env = Object.fromEntries(Object.entries(envValidators).map(([k, v]) => [k, v(k)]));

module.exports = env;

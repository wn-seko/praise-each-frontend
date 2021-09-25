const { toNodeEnv, toString, toNumberOrUndefined } = require('./validator')

const envValidators = {
  NODE_ENV: toNodeEnv,
  API_HOST: toString,
  ANALYZE: toNumberOrUndefined,
}

const env = Object.fromEntries(Object.entries(envValidators).map(([k, v]) => [k, v(k)]))

module.exports = env

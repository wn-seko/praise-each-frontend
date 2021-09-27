const makeValidator = (validate, convert) => {
  return (key) => {
    // eslint-disable-next-line node/no-process-env
    const rawValue = process.env[key];
    if (!validate(rawValue)) {
      throw new Error(`環境変数 ${key} が不正です。(値: ${rawValue})`);
    }

    const value = rawValue;
    const result = convert != null ? convert(value) : value;

    return result;
  };
};

const toNodeEnv = makeValidator((v) => v === 'development' || v === 'production' || v === 'test');
const toString = makeValidator((v) => typeof v === 'string');
const toNumberOrUndefined = makeValidator(
  (v) => typeof v === 'undefined' || !isNaN(Number(v)),
  (v) => (typeof v === 'undefined' ? undefined : Number(v)),
);

module.exports = {
  toNodeEnv,
  toString,
  toNumberOrUndefined,
};
/* eslint-disable node/no-process-env */
const makeValidator = (
  validate: (rawValue: string | undefined) => boolean,
  convert?: (rawValue: string | undefined) => unknown | undefined,
) => {
  return (key: string) => {
    const rawValue = process.env[key];
    if (!validate(rawValue)) {
      throw new Error(`環境変数 ${key} が不正です。(値: ${rawValue})`);
    }

    const value = rawValue;
    const result = convert != null ? convert(value) : value;

    return result;
  };
};

export const toNodeEnv = makeValidator((v) => v === 'development' || v === 'production' || v === 'test');

export const toString = makeValidator((v) => typeof v === 'string');

export const toStringOrUndefined = makeValidator(
  (v) => typeof v === 'string' || typeof v === 'undefined',
  (v) => (typeof v === 'string' ? v : undefined),
);

export const toNumberOrUndefined = makeValidator(
  (v) => typeof v === 'undefined' || !isNaN(Number(v)),
  (v) => (typeof v === 'undefined' ? undefined : Number(v)),
);

import dotenv from 'dotenv';
import { toNodeEnv, toString } from './validator';

const envValidators = {
  NODE_ENV: toNodeEnv,
  API_HOST: toString,
};

export const getEnv = (mode: string) => {
  dotenv.config({ path: mode === 'production' ? '.env.prod' : '.env.dev' });
  return Object.fromEntries(Object.entries(envValidators).map(([k, v]) => [k, v(k)]));
};

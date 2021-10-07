import { Failure, Result, Success } from '~/utils/result';
import api from './api';

export const githubOAuthLogin = (code: string): Promise<Result<{}, {}>> =>
  api
    .post<unknown, {}>('/oauth/github', { code })
    .then((response) => new Success<{}, {}>(response))
    .catch(() => new Failure<{}, {}>({}));

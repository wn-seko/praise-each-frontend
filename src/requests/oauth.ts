import { Failure, Result, Success } from '~/utils/result';
import api from './api';

interface OAuthResponse {
  token: string;
}

interface OAuthResult {
  token: string;
}

export const githubOAuthLogin = (code: string): Promise<Result<OAuthResult, {}>> =>
  api
    .post<unknown, OAuthResponse>('/oauth/github', { code })
    .then((response) => new Success<OAuthResult, {}>({ token: response.token }))
    .catch(() => new Failure<OAuthResult, {}>({}));

export const googleOAuthLogin = (code: string): Promise<Result<OAuthResult, {}>> =>
  api
    .post<unknown, OAuthResponse>('/oauth/google', { code })
    .then((response) => new Success<OAuthResult, {}>({ token: response.token }))
    .catch(() => new Failure<OAuthResult, {}>({}));

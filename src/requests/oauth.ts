import { Failure, Result, Success } from '~/utils/result';
import api from './api';

interface LoginUrlResponse {
  [name: string]: string;
}

interface LoginUrl {
  [name: string]: string;
}

interface OAuthResponse {
  token: string;
}

interface OAuthResult {
  token: string;
}

export const getLoginUrls = (): Promise<Result<LoginUrl[], {}>> =>
  api
    .get<unknown, LoginUrlResponse[]>('/oauth/login_urls')
    .then((response) => new Success<LoginUrl[], {}>(response))
    .catch(() => new Failure<LoginUrl[], {}>({}));

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

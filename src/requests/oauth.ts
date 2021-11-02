import { OAuthType } from '~/domains/oauth';
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

export const oauthLogin = (type: OAuthType, code: string): Promise<Result<OAuthResult, {}>> =>
  api
    .post<unknown, OAuthResponse>(`/oauth/${type}/login`, { code })
    .then((response) => new Success<OAuthResult, {}>({ token: response.token }))
    .catch(() => new Failure<OAuthResult, {}>({}));

export const oauthUpdateIcon = (type: OAuthType, code: string): Promise<Result<OAuthResult, {}>> =>
  api
    .post<unknown, OAuthResponse>(`/oauth/${type}/update_icon`, { code })
    .then((response) => new Success<OAuthResult, {}>({ token: response.token }))
    .catch(() => new Failure<OAuthResult, {}>({}));

export const oauthLinkage = (type: OAuthType, code: string): Promise<Result<{}, {}>> =>
  api
    .post<unknown, OAuthResponse>(`/oauth/${type}/linkage`, { code })
    .then(() => new Success<{}, {}>({}))
    .catch(() => new Failure<{}, {}>({}));

export const fetchOAuthLinks = (type: 'login' | 'update_icon' | 'linkage'): Promise<Result<LoginUrl, {}>> =>
  api
    .get<unknown, LoginUrlResponse>(`/oauth/links/${type}`)
    .then((response) => new Success<LoginUrl, {}>(response))
    .catch(() => new Failure<LoginUrl, {}>({}));

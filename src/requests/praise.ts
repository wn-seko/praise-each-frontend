import dayjs from 'dayjs';

import { Praise, Stamp } from '~/domains/praise';
import { User } from '~/domains/user';
import { Failure, Result, Success } from '~/utils/result';

import api from './api';

interface PraiseResponse {
  id: string;
  from: User;
  to: User;
  message: string;
  tags: string[];
  upVotes: User[];
  stamps: Stamp[];
  likes: User[];
  createdAt: string;
  updatedAt: string;
}

interface PraiseQuery {
  from?: string;
  to?: string;
  teamId?: string;
  page?: number;
}

interface PraiseRequestParams {
  from?: string;
  to?: string;
  teamId?: string;
  page: number;
  limit: number;
}

const queryToRequestParams = (query: PraiseQuery): PraiseRequestParams => ({
  from: query.from,
  to: query.to,
  teamId: query.teamId,
  page: query.page || 1,
  limit: 20,
});

const responseToPraise = (response: PraiseResponse): Praise => ({
  ...response,
  createdAt: dayjs(response.createdAt),
  updatedAt: dayjs(response.updatedAt),
});

export const fetchPraise = (query: PraiseQuery): Promise<Praise[]> => {
  const requestParams = queryToRequestParams(query);
  return api
    .get<unknown, PraiseResponse[]>('/praises', { params: requestParams })
    .then((response) => response.map(responseToPraise));
};

export const postPraise = (to: string, message: string, tags: string[]): Promise<Result<Praise, {}>> =>
  api
    .post<unknown, PraiseResponse>('/praises', { to, message, tags })
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

export const postPraiseUpVote = (praiseId: string): Promise<Result<Praise, {}>> =>
  api
    .post<unknown, PraiseResponse>(`/praises/${praiseId}/up_votes`)
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

export const putPraise = (praiseId: string, message: string, tags: string[]): Promise<Result<Praise, {}>> =>
  api
    .put<unknown, PraiseResponse>(`/praises/${praiseId}`, { message, tags })
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

export const deletePraise = (praiseId: string): Promise<Result<{}, {}>> =>
  api
    .delete<unknown, PraiseResponse>(`/praises/${praiseId}`)
    .then(() => new Success<{}, {}>({}))
    .catch(() => new Failure<{}, {}>({}));

export const deletePraiseUpVote = (praiseId: string): Promise<Result<Praise, {}>> =>
  api
    .delete<unknown, PraiseResponse>(`/praises/${praiseId}/up_votes`)
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

export const postPraiseLike = (praiseId: string): Promise<Result<Praise, {}>> =>
  api
    .post<unknown, PraiseResponse>(`/praises/${praiseId}/likes`)
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

export const deletePraiseLike = (praiseId: string): Promise<Result<Praise, {}>> =>
  api
    .delete<unknown, PraiseResponse>(`/praises/${praiseId}/likes`)
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

export const postPraiseStamp = (praiseId: string, stamp: string): Promise<Result<Praise, {}>> =>
  api
    .post<unknown, PraiseResponse>(`/praises/${praiseId}/stamps/${stamp}`)
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

export const deletePraiseStamp = (praiseId: string, stamp: string): Promise<Result<Praise, {}>> =>
  api
    .delete<unknown, PraiseResponse>(`/praises/${praiseId}/stamps/${stamp}`)
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

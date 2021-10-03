import dayjs from 'dayjs';
import { Praise } from '~/domains/praise';
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
  likes: User[];
  createdAt: string;
}

interface PraiseQuery {
  from?: string;
  to?: string;
  page: number;
  limit: number;
}

interface PraiseRequestParams {
  from?: string;
  to?: string;
  offset: number;
  limit: number;
}

const queryToRequestParams = (query: PraiseQuery): PraiseRequestParams => ({
  from: query.from,
  to: query.to,
  offset: query.page - 1,
  limit: query.limit,
});

const responseToPraise = (response: PraiseResponse): Praise => ({
  ...response,
  createdAt: dayjs(response.createdAt),
});

export const fetchPraise = (query: PraiseQuery): Promise<Praise[]> => {
  const requestParams = queryToRequestParams(query);
  return api
    .get<unknown, PraiseResponse[]>('/praises', { params: requestParams })
    .then((response) => response.map(responseToPraise));
};

export const postPraise = (to: string, message: string, tags: string[]): Promise<Result<Praise, {}>> =>
  api
    .post<unknown, PraiseResponse>('/praises', { from: '', to, message, tags })
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

export const postPraiseUpVote = (praiseId: string): Promise<Result<Praise, {}>> =>
  api
    .post<unknown, PraiseResponse>(`/praises/${praiseId}/up_votes`)
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

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

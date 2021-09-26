import dayjs from 'dayjs';
import { Praise } from '~/domains/praise';
import { User } from '~/domains/user';
import { Failure, Result, Success } from '~/utils/result';
import api from './api';

interface PraiseResponse {
  from: User;
  to: User;
  message: string;
  tags: string[];
  createdAt: string;
}

const responseToPraise = (response: PraiseResponse): Praise => ({
  ...response,
  createdAt: dayjs(response.createdAt),
});

export const fetchPraise = (): Promise<Praise[]> =>
  api.get<unknown, PraiseResponse[]>('/praises').then((response) => response.map(responseToPraise));

export const postPraise = (to: string, message: string, tags: string[]): Promise<Result<Praise, {}>> =>
  api
    .post<unknown, PraiseResponse>('/praises', { from: '', to, message, tags })
    .then((response) => new Success<Praise, {}>(responseToPraise(response)))
    .catch(() => new Failure<Praise, {}>({}));

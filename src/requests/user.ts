import { User } from '~/domains/user';
import { Failure, Result, Success } from '~/utils/result';
import api from './api';

interface SearchUserParams {
  word?: string;
}

export const searchUser = (params: SearchUserParams = {}): Promise<Result<User[], {}>> =>
  api
    .get<unknown, User[]>('/users', { params })
    .then((response) => new Success<User[], {}>(response))
    .catch(() => new Failure<User[], {}>({}));

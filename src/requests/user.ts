import { User } from '~/domains/user';
import { Failure, Result, Success } from '~/utils/result';
import api from './api';

export const searchUser = (word: string): Promise<Result<User[], {}>> =>
  api
    .get<unknown, User[]>('/users', { params: { word } })
    .then((response) => new Success<User[], {}>(response))
    .catch(() => new Failure<User[], {}>({}));

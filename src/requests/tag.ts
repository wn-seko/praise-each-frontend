import { Tag } from '~/domains/tag';
import { Pagination } from '~/utils/pagination';
import { Failure, Result, Success } from '~/utils/result';
import api from './api';

export const postTag = (name: string): Promise<Result<Tag, {}>> =>
  api
    .post<unknown, Tag>('/tags', { name })
    .then((response) => new Success<Tag, {}>(response))
    .catch(() => new Failure<Tag, {}>({}));

export const searchTags = (word?: string): Promise<Result<Pagination<Tag>, {}>> =>
  api
    .get<unknown, Pagination<Tag>>('/tags', { params: { word } })
    .then((response) => new Success<Pagination<Tag>, {}>(response))
    .catch(() => new Failure<Pagination<Tag>, {}>({}));

export const deleteTag = (tagId: string) =>
  api
    .delete<unknown, {}>(`/tags/${tagId}`)
    .then((response) => new Success<{}, {}>(response))
    .catch(() => new Failure<{}, {}>({}));

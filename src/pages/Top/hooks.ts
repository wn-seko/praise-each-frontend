import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { Praise } from '~/domains/praise';
import { User } from '~/domains/user';
import {
  deletePraiseLike,
  deletePraiseUpVote,
  fetchPraise as fetchPraiseApi,
  postPraiseLike,
  postPraiseUpVote,
} from '~/requests/praise';

const includesUser = (userId: string, users: User[]) => users.findIndex((user) => user.id === userId) >= 0;

const createClickUpVoteHandler = (praiseId: string, userId: string, users: User[]) => () => {
  if (includesUser(userId, users)) {
    deletePraiseUpVote(praiseId);
  } else {
    postPraiseUpVote(praiseId);
  }
};

const createClickLikeHandler = (praiseId: string, userId: string, users: User[]) => () => {
  if (includesUser(userId, users)) {
    deletePraiseLike(praiseId);
  } else {
    postPraiseLike(praiseId);
  }
};

const formatPraise = (praise: Praise, userId: string) => ({
  ...praise,
  upVoted: includesUser(userId, praise.upVotes),
  liked: includesUser(userId, praise.likes),
  isMine: includesUser(userId, [praise.from, praise.to]),
  createdAt: praise.createdAt.format('YYYY/MM/DD HH:mm'),
  onClickUpVote: createClickUpVoteHandler(praise.id, userId, praise.upVotes),
  onClickLike: createClickLikeHandler(praise.id, userId, praise.likes),
});

export const usePraise = () => {
  const [{ loading, value }, fetchPraise] = useAsyncFn(() => fetchPraiseApi());

  // TODO: implements me
  const MY_USER_ID = '00000000-0000-0000-0000-000000000000';

  useEffect(() => {
    fetchPraise();
  }, []);

  return { loading, priases: (value || []).map((praise) => formatPraise(praise, MY_USER_ID)) };
};

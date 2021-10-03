import { atom, selector, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { Praise } from '~/domains/praise';
import { User } from '~/domains/user';
import {
  deletePraiseLike as deletePraiseLikeApi,
  deletePraiseUpVote as deletePraiseUpVoteApi,
  fetchPraise as fetchPraiseApi,
  postPraiseLike as postPraiseLikeApi,
  postPraiseUpVote as postPraiseUpVoteApi,
} from '~/requests/praise';

// TODO: implements me
const MY_USER_ID = '00000000-0000-0000-0000-000000000000';

export interface EnhancedPraise extends Omit<Praise, 'createdAt' | 'updatedAt'> {
  liked: boolean;
  upVoted: boolean;
  isMine: boolean;
  createdAt: string;
  onClickLike: () => void;
  onClickUpVote: () => void;
}

export const praiseState = atom<Praise[]>({
  key: 'pages/top/praiseState',
  default: selector<Praise[]>({
    key: 'pages/top/praiseState/Default',
    get: async () => {
      return await fetchPraiseApi();
    },
  }),
});

const includesUser = (userId: string, users: User[]) => users.findIndex((user) => user.id === userId) >= 0;

const createClickUpVoteHandler =
  (praiseId: string, userId: string, users: User[], updatePraise: (praise: Praise) => void) => () => {
    if (includesUser(userId, users)) {
      deletePraiseUpVoteApi(praiseId).then((result) => {
        if (result.isSuccess()) {
          updatePraise(result.value);
        }
      });
    } else {
      postPraiseUpVoteApi(praiseId).then((result) => {
        if (result.isSuccess()) {
          updatePraise(result.value);
        }
      });
    }
  };

const createClickLikeHandler =
  (praiseId: string, userId: string, users: User[], updatePraise: (praise: Praise) => void) => () => {
    if (includesUser(userId, users)) {
      deletePraiseLikeApi(praiseId).then((result) => {
        if (result.isSuccess()) {
          updatePraise(result.value);
        }
      });
    } else {
      postPraiseLikeApi(praiseId).then((result) => {
        if (result.isSuccess()) {
          updatePraise(result.value);
        }
      });
    }
  };

const formatPraise = (praise: Praise, userId: string, updatePraise: (praise: Praise) => void): EnhancedPraise => ({
  ...praise,
  upVoted: includesUser(userId, praise.upVotes),
  liked: includesUser(userId, praise.likes),
  isMine: includesUser(userId, [praise.from, praise.to]),
  createdAt: praise.createdAt.format('YYYY/MM/DD HH:mm'),
  onClickUpVote: createClickUpVoteHandler(praise.id, userId, praise.upVotes, updatePraise),
  onClickLike: createClickLikeHandler(praise.id, userId, praise.likes, updatePraise),
});

export const usePraise = () => {
  const { state, contents } = useRecoilValueLoadable<Praise[]>(praiseState);
  const setPraises = useSetRecoilState(praiseState);

  const updatePraise = (praise: Praise) => {
    setPraises((prevPraises) => prevPraises.map((p) => (p.id === praise.id ? praise : p)));
  };

  const praises = state === 'hasValue' ? (contents as Praise[]) : [];

  return {
    loading: state === 'loading',
    praises: praises.map((praise) => formatPraise(praise, MY_USER_ID, updatePraise)),
  };
};

import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import { Praise } from '~/domains/praise';
import { User } from '~/domains/user';
import { authUserState, useAuthUser } from '~/recoil/auth';
import {
  deletePraiseLike as deletePraiseLikeApi,
  deletePraiseUpVote as deletePraiseUpVoteApi,
  fetchPraise as fetchPraiseApi,
  postPraiseLike as postPraiseLikeApi,
  postPraiseUpVote as postPraiseUpVoteApi,
} from '~/requests/praise';

type TabName = 'timeline' | 'sent' | 'received' | 'search';

export interface EnhancedPraise extends Omit<Praise, 'createdAt' | 'updatedAt'> {
  liked: boolean;
  upVoted: boolean;
  isMine: boolean;
  createdAt: string;
  onClickLike: () => void;
  onClickUpVote: () => void;
}

type PraiseQuery = Readonly<{
  from?: string;
  to?: string;
  page: number;
  limit: 20;
}>;

const tabState = atom<TabName>({
  key: 'pages/top/tabState',
  default: 'timeline',
});

const praiseQueryState = atom<PraiseQuery>({
  key: 'pages/top/praiseQueryState',
  default: selector<PraiseQuery>({
    key: 'pages/top/praiseQueryState/Default',
    get: ({ get }) => {
      const authUser = get(authUserState);
      const tab = get(tabState);

      switch (tab) {
        case 'timeline':
          return { page: 1, limit: 20 };
        case 'received':
          return { to: authUser?.id, page: 1, limit: 20 };
        case 'sent':
          return { from: authUser?.id, page: 1, limit: 20 };
        case 'search':
          return { page: 1, limit: 20 };
      }
    },
    cachePolicy_UNSTABLE: { eviction: 'most-recent' },
  }),
});

const praisesState = atomFamily<Praise[], PraiseQuery>({
  key: 'pages/top/praisesState',
  default: async (query: PraiseQuery) => {
    return await fetchPraiseApi(query);
  },
});

export const praisesSelector = selectorFamily<Praise[], PraiseQuery>({
  key: 'pages/top/praisesSelector',
  get:
    (query: PraiseQuery) =>
    async ({ get }) => {
      return get(praisesState(query));
    },
  set:
    (query: PraiseQuery) =>
    ({ set }, praises: Praise[] | DefaultValue) => {
      set(praisesState(query), praises);
    },
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

export const useTab = () => {
  const setTab = useSetRecoilState(tabState);

  const handleChangeTab = (tabName: TabName) => {
    setTab(tabName);
  };

  return { handleChangeTab };
};

export const usePraisePage = () => {
  const query = useRecoilValue<PraiseQuery>(praiseQueryState);
  const { state, contents } = useRecoilValueLoadable<Praise[]>(praisesState(query));
  const setPraises = useSetRecoilState(praisesState(query));
  const currentTab = useRecoilValue(tabState);
  const { user } = useAuthUser();

  const refetchTimeline = async () => {
    setPraises(await fetchPraiseApi(query));
  };

  const updatePraise = (praise: Praise) => {
    setPraises((prevPraises) => prevPraises.map((p) => (p.id === praise.id ? praise : p)));
  };

  const praises = state === 'hasValue' ? (contents as Praise[]) : [];

  return {
    currentTab,
    loading: state === 'loading',
    praises: praises.map((praise) => formatPraise(praise, user?.id || '', updatePraise)),
    refetchTimeline,
  };
};

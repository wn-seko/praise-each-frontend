import { useState } from 'react';
import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilState,
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

export type TabType = 'timeline' | 'team' | 'sent' | 'received' | 'search';

export interface TabState {
  type: TabType;
  id?: string;
}

export interface EnhancedPraise extends Omit<Praise, 'createdAt' | 'updatedAt'> {
  liked: boolean;
  upVoted: boolean;
  isMine: boolean;
  isEdit: boolean;
  createdAt: string;
  updatedAt: string;
  onClickLike: () => void;
  onClickUpVote: () => void;
  onUpdate: (praise: Praise) => void;
  onDelete: () => void;
}

type PraiseQuery = Readonly<{
  from?: string;
  to?: string;
  teamId?: string;
}>;

const tabState = atom<TabState>({
  key: 'pages/top/tabState',
  default: { type: 'timeline' },
});

const pageState = atom<{ page: number; isLast: boolean }>({
  key: 'pages/top/pageState',
  default: { page: 1, isLast: false },
});

const praiseQueryState = atom<PraiseQuery>({
  key: 'pages/top/praiseQueryState',
  default: selector<PraiseQuery>({
    key: 'pages/top/praiseQueryState/Default',
    get: ({ get }) => {
      const authUser = get(authUserState);
      const tab = get(tabState);

      switch (tab.type) {
        case 'timeline':
          return {};
        case 'team':
          return { teamId: tab.id };
        case 'received':
          return { to: authUser?.id };
        case 'sent':
          return { from: authUser?.id };
        case 'search':
          return {};
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

const formatPraise = (
  praise: Praise,
  userId: string,
  updatePraise: (praise: Praise) => void,
  deletePraise: (praiseId: string) => void,
): EnhancedPraise => ({
  ...praise,
  upVoted: includesUser(userId, praise.upVotes),
  liked: includesUser(userId, praise.likes),
  isMine: includesUser(userId, [praise.from, praise.to]),
  createdAt: praise.createdAt.format('YYYY/MM/DD HH:mm'),
  updatedAt: praise.updatedAt.format('YYYY/MM/DD HH:mm'),
  isEdit: !praise.createdAt.isSame(praise.updatedAt),
  onClickUpVote: createClickUpVoteHandler(praise.id, userId, praise.upVotes, updatePraise),
  onClickLike: createClickLikeHandler(praise.id, userId, praise.likes, updatePraise),
  onUpdate: updatePraise,
  onDelete: () => deletePraise(praise.id),
});

export const useTab = () => {
  const query = useRecoilValue<PraiseQuery>(praiseQueryState);
  const setPraises = useSetRecoilState(praisesState(query));
  const setTab = useSetRecoilState(tabState);
  const setPage = useSetRecoilState(pageState);

  const handleChangeTab = async (tabType: TabType, id?: string) => {
    setPage({ page: 1, isLast: false });
    setTab({ type: tabType, id });
    setPraises(await fetchPraiseApi(query));
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

  const deletePraise = (praiseId: string) => {
    setPraises((prevPraises) => prevPraises.filter((p) => p.id !== praiseId));
  };

  const praises = state === 'hasValue' ? (contents as Praise[]) : [];

  return {
    currentTab,
    loading: state === 'loading',
    praises: praises.map((praise) => formatPraise(praise, user?.id || '', updatePraise, deletePraise)),
    refetchTimeline,
  };
};

export const useScroll = () => {
  const [{ page, isLast }, setPage] = useRecoilState(pageState);
  const query = useRecoilValue<PraiseQuery>(praiseQueryState);
  const setPraises = useSetRecoilState(praisesState(query));
  const [loadOnScroll, setLoadOnScroll] = useState(false);

  const onInRange = () => {
    if (isLast) {
      return;
    }

    setLoadOnScroll(true);

    fetchPraiseApi({ ...query, page: page + 1 }).then((result) => {
      setLoadOnScroll(false);
      setPage((prev) => ({ page: prev.page + 1, isLast: result.length === 0 }));
      setPraises((prev) => prev.concat(result));
    });
  };

  return { loadOnScroll, onInRange };
};

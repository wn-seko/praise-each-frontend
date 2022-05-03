import { atomFamily, useRecoilCallback } from 'recoil';

import { searchTeam as searchTeamsApi } from '~/requests/teams';

const defaultPagination = { currentPage: 1, limit: 20, pages: 1 };
const defaultPaginationTeam = { list: [], pagination: defaultPagination };

export const teamsState = atomFamily({
  key: 'pages/Teams/teams',
  default: async (params: { name?: string }) => {
    const result = await searchTeamsApi(params);
    return result.isSuccess() ? result.value : defaultPaginationTeam;
  },
});

export const createRefreshTeams = () =>
  useRecoilCallback(
    ({ set }) =>
      async () => {
        const result = await searchTeamsApi();
        set(teamsState({}), result.isSuccess() ? result.value : defaultPaginationTeam);
      },
    [],
  );

import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { Team } from '~/domains/team';
import { searchTeam as searchTeamsApi } from '~/requests/teams';

export const useTeams = () => {
  const [state, searchTeams] = useAsyncFn(async () => searchTeamsApi());
  const loading = state.loading;
  const defaultPagination = { currentPage: 1, limit: 20, pages: 1 };
  const defaultTeams = [] as Team[];
  const { list, pagination } = state.value?.isSuccess()
    ? state.value.value
    : { list: defaultTeams, pagination: defaultPagination };

  useEffect(() => {
    searchTeams();
  }, []);

  return { loading, teams: list, pagination };
};

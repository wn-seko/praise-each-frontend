import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { fetchTeam as fetchTeamApi } from '~/requests/teams';

export const useTeam = (teamId: string) => {
  const [state, fetchTeam] = useAsyncFn(fetchTeamApi);
  const team = state.value?.isSuccess() ? state.value.value : null;

  useEffect(() => {
    fetchTeam(teamId);
  }, []);

  return { loading: state.loading, team };
};

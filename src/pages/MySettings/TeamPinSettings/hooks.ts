import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { fetchMyTeams as fetchMyTeamsApi } from '~/requests/teams';

export const useMyTeams = () => {
  const [state, fetchMyTeams] = useAsyncFn(fetchMyTeamsApi);
  const teams = state.value?.isSuccess() ? state.value.value : [];

  useEffect(() => {
    fetchMyTeams();
  }, []);

  return { loading: state.loading, teams };
};

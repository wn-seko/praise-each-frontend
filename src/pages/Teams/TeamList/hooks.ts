import { useRecoilValue } from 'recoil';
import { Team } from '~/domains/team';
import { Pagination } from '~/utils/pagination';
import { createRefreshTeams, teamsState } from '../hooks';
import { useEffect } from 'react';

export const useTeams = () => {
  const { list, pagination } = useRecoilValue<Pagination<Team>>(teamsState({}));
  const refreshTeams = createRefreshTeams();

  useEffect(() => {
    refreshTeams();
  }, []);

  return { teams: list, pagination };
};

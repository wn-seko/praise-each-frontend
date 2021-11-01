import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router';
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

export const useRouting = () => {
  const history = useHistory();

  const redirect = (teamId: string) => {
    history.push(`/teams/${teamId}`);
  };

  return { redirect };
};

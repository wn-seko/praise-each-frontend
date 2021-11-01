import { useRecoilValue } from 'recoil';
import { teamState } from '../hooks';

export const useTeam = (teamId: string) => {
  const team = useRecoilValue(teamState(teamId));
  return { team };
};

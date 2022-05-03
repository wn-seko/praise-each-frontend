import { atomFamily } from 'recoil';

import { fetchTeam as fetchTeamApi } from '~/requests/teams';

export const teamState = atomFamily({
  key: 'pages/Teams/teams',
  default: async (teamId: string) => {
    const result = await fetchTeamApi(teamId);
    return result.isSuccess() ? result.value : null;
  },
});

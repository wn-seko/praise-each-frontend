import { useEffect } from 'react';
import { atom, DefaultValue, selector, useRecoilState, useSetRecoilState } from 'recoil';

import { Team } from '~/domains/team';
import { TeamPin } from '~/domains/teamPin';
import { authUserState } from '~/recoil/auth';
import { fetchTeamPins, postTeamPin, deleteTeamPin } from '~/requests/teamPin';
import { fetchMyTeams } from '~/requests/teams';

interface TeamWithPin extends Team {
  pined: boolean;
}

const TeamState = atom<Team[]>({
  key: 'pages/MySettings/TeamPinSettings/TeamState',
  default: selector({
    key: 'pages/MySettings/TeamPinSettings/TeamState/Default',
    get: async () => {
      const result = await fetchMyTeams();
      return result.isSuccess() ? result.value : [];
    },
  }),
});

const TeamPinState = atom<TeamPin[]>({
  key: 'pages/MySettings/TeamPinSettings/TeamPinState',
  default: selector({
    key: 'pages/MySettings/TeamPinSettings/TeamPinState/Default',
    get: async () => {
      const result = await fetchTeamPins();
      return result.isSuccess() ? result.value : [];
    },
  }),
});

const TeamSelector = selector<TeamWithPin[]>({
  key: 'pages/MySettings/TeamPinSettings/TeamSelector',
  get: ({ get }) => {
    const teams = get(TeamState);
    const teamPins = get(TeamPinState);

    return teams.map((team) => ({
      ...team,
      pined: !!teamPins.find((teamPin) => teamPin.teamId === team.id),
    }));
  },
  set: ({ set, get }, teams: TeamWithPin[] | DefaultValue) => {
    if ('length' in teams) {
      const user = get(authUserState);
      set(
        TeamState,
        teams.map((team) => ({ id: team.id, name: team.name, color: team.color, users: team.users })),
      );
      set(
        TeamPinState,
        teams.filter((team) => team.pined).map((team) => ({ userId: user?.id || '', teamId: team.id })),
      );
    }
  },
});

export const useMyTeams = () => {
  const [teams, setTeams] = useRecoilState(TeamSelector);
  const setTeamsState = useSetRecoilState(TeamState);

  const createAddPin = (teamId: string) => async () => {
    const result = await postTeamPin(teamId);

    if (result.isSuccess()) {
      setTeams((prev) => prev.map((team) => (team.id === teamId ? { ...team, pined: true } : team)));
    }
  };

  const createRemovePin = (teamId: string) => async () => {
    const result = await deleteTeamPin(teamId);

    if (result.isSuccess()) {
      setTeams((prev) => prev.map((team) => (team.id === teamId ? { ...team, pined: false } : team)));
    }
  };

  const enhancedTeams = teams.map((team) => ({
    ...team,
    onClick: team.pined ? createRemovePin(team.id) : createAddPin(team.id),
  }));

  useEffect(() => {
    fetchMyTeams().then((result) => {
      if (result.isSuccess()) {
        setTeamsState(result.value);
      }
    });
  }, []);

  return { teams: enhancedTeams };
};

import { useEffect } from 'react';
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { Team } from '~/domains/team';
import { fetchTeamPins } from '~/requests/teamPin';
import { fetchMyTeams } from '~/requests/teams';

const MyTeamState = atom({
  key: 'pages/Top/MyTeamState',
  default: selector({
    key: 'pages/Top/MyTeamState/Default',
    get: async () => {
      const result = await fetchMyTeams();
      return result.isSuccess() ? result.value : [];
    },
  }),
});

const TeamPinState = atom({
  key: 'pages/Top/TeamPinState',
  default: selector({
    key: 'pages/Top/TeamPinState/Default',
    get: async () => {
      const result = await fetchTeamPins();
      return result.isSuccess() ? result.value : [];
    },
  }),
});

const PinedTeamState = selector({
  key: 'pages/Top/TeamSelector',
  get: ({ get }) => {
    const teams = get(MyTeamState);
    const teamPins = get(TeamPinState);
    return teamPins
      .map((teamPin) => teams.find((team) => team.id === teamPin.teamId))
      .filter((team) => !!team) as Team[];
  },
});

export const usePinedTeams = () => {
  const pinedTeams = useRecoilValue(PinedTeamState);
  const setTeams = useSetRecoilState(MyTeamState);
  const setTeamPins = useSetRecoilState(TeamPinState);

  useEffect(() => {
    fetchMyTeams().then((result) => {
      if (result.isSuccess()) {
        setTeams(result.value);
      }
    });
    fetchTeamPins().then((result) => {
      if (result.isSuccess()) {
        setTeamPins(result.value);
      }
    });
  }, []);

  return { pinedTeams };
};

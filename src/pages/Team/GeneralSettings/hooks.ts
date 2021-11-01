import { toast } from 'react-toastify';
import { useAsyncFn } from 'react-use';
import { useSetRecoilState } from 'recoil';
import { User } from '~/domains/user';
import { putTeam as putTeamApi, updateTeamUser } from '~/requests/teams';
import { teamState } from '../hooks';

export const useUpdateTeam = (teamId: string) => {
  const setTeam = useSetRecoilState(teamState(teamId));
  const [state, putTeam] = useAsyncFn(putTeamApi);

  const handleSave = async (name: string, color: string, users: User[], close: () => void) => {
    const updateTeamResult = await putTeam(teamId, name, color);

    if (updateTeamResult.isFailure()) {
      toast.error('保存に失敗しました');
      return;
    }

    const updateTeamUserResult = await updateTeamUser(
      teamId,
      users.map((user) => user.id),
    );

    if (updateTeamUserResult.isFailure()) {
      toast.error('保存に失敗しました');
      return;
    }

    setTeam(updateTeamUserResult.value);
    close();
  };

  return { updating: state.loading, handleSave };
};

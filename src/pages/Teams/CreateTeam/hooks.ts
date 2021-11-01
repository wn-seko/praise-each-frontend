import { toast } from 'react-toastify';
import { useAsyncFn } from 'react-use';
import { postTeam as postTeamApi, updateTeamUser } from '~/requests/teams';
import { User } from '~/domains/user';
import { createRefreshTeams } from '../hooks';

export const useCreateTeam = () => {
  const refreshTeams = createRefreshTeams();

  const [state, postTeam] = useAsyncFn(postTeamApi);

  const handleSave = async (name: string, color: string, users: User[], close: () => void) => {
    const createTeamResult = await postTeam(name, color);

    if (createTeamResult.isFailure()) {
      toast.error('保存に失敗しました');
      return;
    }

    const teamId = createTeamResult.value.id;
    const updateTeamUserResult = await updateTeamUser(
      teamId,
      users.map((user) => user.id),
    );

    if (updateTeamUserResult.isFailure()) {
      toast.error('保存に失敗しました');
      return;
    }

    close();
    refreshTeams();
  };

  return { creating: state.loading, handleSave };
};

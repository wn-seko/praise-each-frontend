import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useAsyncFn } from 'react-use';
import { Team } from '~/domains/team';
import { searchTeam as searchTeamsApi, postTeam as postTeamApi, updateTeamUser } from '~/requests/teams';
import { User } from '~/domains/user';

export const useTeams = () => {
  const [state, searchTeams] = useAsyncFn(async () => searchTeamsApi());
  const defaultPagination = { currentPage: 1, limit: 20, pages: 1 };
  const defaultTeams = [] as Team[];
  const { list, pagination } = state.value?.isSuccess()
    ? state.value.value
    : { list: defaultTeams, pagination: defaultPagination };

  useEffect(() => {
    searchTeams();
  }, []);

  return { fetching: state.loading, teams: list, pagination };
};

export const useRouting = () => {
  const history = useHistory();

  const redirect = (teamId: string) => {
    history.push(`/teams/${teamId}`);
  };

  return { redirect };
};

export const useCreateTeam = () => {
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
  };

  return { creating: state.loading, handleSave };
};

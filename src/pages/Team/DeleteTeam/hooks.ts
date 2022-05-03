import { useNavigate } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { deleteTeam as deleteTeamApi } from '~/requests/teams';

export const useTeam = (teamId: string, closeModal: () => void) => {
  const [state, deleteTeam] = useAsyncFn(deleteTeamApi);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const result = await deleteTeam(teamId);

    if (result.isSuccess()) {
      closeModal();
      navigate('/teams');
    }
  };

  return { loading: state.loading, handleConfirm };
};

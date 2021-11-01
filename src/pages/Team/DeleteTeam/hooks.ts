import { useState } from 'react';
import { useHistory } from 'react-router';
import { useAsyncFn } from 'react-use';
import { deleteTeam as deleteTeamApi } from '~/requests/teams';

export const useTeam = (teamId: string, closeModal: () => void) => {
  const [state, deleteTeam] = useAsyncFn(deleteTeamApi);
  const history = useHistory();

  const handleConfirm = async () => {
    const result = await deleteTeam(teamId);

    if (result.isSuccess()) {
      closeModal();
      history.push('/teams');
    }
  };

  return { loading: state.loading, handleConfirm };
};

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return { isOpen, closeModal, openModal };
};

import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAsyncFn } from 'react-use';
import { postTeam as postTeamApi } from '~/requests/teams';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, handleOpen, handleClose };
};

export const useField = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  return { name, color, setName, setColor };
};

export const useTeam = (name: string, color: string, handleClose: () => void) => {
  const [state, postTeam] = useAsyncFn(postTeamApi);

  const handleSubmitTeam = async () => {
    const result = await postTeam(name, color);

    if (result.isFailure()) {
      toast.error('保存に失敗しました');
      return;
    }

    handleClose();
  };

  return { loading: state.loading, handleSubmitTeam };
};

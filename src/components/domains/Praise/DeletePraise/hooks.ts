import { useAsyncFn } from 'react-use';
import { deletePraise as deletePraiseApi } from '~/requests/praise';

export const usePraise = (praiseId: string, closeModal: () => void, onDelete: () => void) => {
  const [state, deleteTeam] = useAsyncFn(deletePraiseApi);

  const handleConfirm = async () => {
    const result = await deleteTeam(praiseId);

    if (result.isSuccess()) {
      closeModal();
      onDelete();
    }
  };

  return { loading: state.loading, handleConfirm };
};

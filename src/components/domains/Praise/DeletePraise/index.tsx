import React, { FC } from 'react';
import ConfirmModal from '~/components/ui/ConfirmModal';
import { useModal } from '~/hooks/useModal';
import { usePraise } from './hooks';

interface DeletePraiseProps {
  praiseId: string;
  onDelete: () => void;
}

const DeletePraise: FC<DeletePraiseProps> = ({ praiseId, onDelete, children }) => {
  const { isOpen, open, close } = useModal();
  const { loading, handleConfirm } = usePraise(praiseId, close, onDelete);
  const onClickTrigger = () => {
    open();
  };

  return (
    <>
      <span onClick={onClickTrigger}>{children}</span>
      <ConfirmModal
        title="感謝を削除"
        message="この操作は取り消せません。よろしいですか？"
        buttonText="感謝を削除"
        buttonType="negative"
        isOpen={isOpen}
        loading={loading}
        handleConfirm={handleConfirm}
        handleClose={close}
      />
    </>
  );
};

export default DeletePraise;

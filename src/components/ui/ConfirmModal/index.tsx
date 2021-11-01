import React, { FC } from 'react';
import { Modal, Button } from 'semantic-ui-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  loading: boolean;
  buttonText: string;
  buttonType?: 'positive' | 'negative' | 'primary';
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  loading,
  buttonText,
  buttonType,
  handleClose,
  handleConfirm,
}) => {
  const buttonTypeAttribute = buttonType ? { [buttonType]: true } : {};

  return (
    <Modal size="small" closeOnDimmerClick={false} onClose={handleClose} open={isOpen}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{message}</Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button loading={loading} onClick={handleConfirm} {...buttonTypeAttribute}>
          {buttonText}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmModal;

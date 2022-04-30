import React, { FC } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalOverlay,
} from '@chakra-ui/react';

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
    <Modal size="md" isCentered={true} closeOnOverlayClick={false} onClose={handleClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button onClick={handleClose} mr={4}>
            キャンセル
          </Button>
          <Button colorScheme="red" disabled={loading} onClick={handleConfirm} {...buttonTypeAttribute}>
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;

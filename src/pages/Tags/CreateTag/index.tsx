import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { ChangeEvent, FC } from 'react';

import { useModal, useField, useCreateTag } from './hooks';

interface CreateTagProps {
  refresh: () => void;
}

const CreateTag: FC<CreateTagProps> = ({ refresh }) => {
  const { isOpen, open, close } = useModal();
  const { name, setName } = useField();
  const { creating, handleSave } = useCreateTag(refresh);

  const onSave = () => {
    handleSave(name, close);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  return (
    <>
      <Button colorScheme="green" onClick={open}>
        タグを追加
      </Button>
      <Modal size="md" onClose={close} isOpen={isOpen} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タグを追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <label>タグ名</label>
              <Input defaultValue={name} onChange={handleChangeName} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={close} mr={4}>
              キャンセル
            </Button>
            <Button disabled={creating} onClick={onSave} colorScheme="green">
              追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTag;

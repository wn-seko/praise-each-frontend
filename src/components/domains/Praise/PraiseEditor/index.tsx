import React, { FC } from 'react';
import {
  Avatar,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalOverlay,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { Praise } from '~/domains/praise';
import { useModal } from '~/hooks/useModal';
import PraiseInput from '../PraiseInput';
import { useField } from './hooks';

interface EnhancedPraise extends Omit<Praise, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
  onUpdate: (praise: Praise) => void;
}

interface PraiseEditor {
  praise: EnhancedPraise;
}

const PraiseEditor: FC<PraiseEditor> = ({ children, praise }) => {
  const { isOpen, open, close } = useModal();
  const { saving, setMessage, handleSave } = useField(praise.id, praise.message, praise.onUpdate, close);

  return (
    <>
      <span onClick={open}>{children}</span>
      <Modal size="xl" isCentered={true} closeOnOverlayClick={false} isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex direction="row" alignItems="center" gap={4}>
              <div>
                <Avatar mr={2} size="sm" src={praise.from.icon} />
                {praise.from.name}
              </div>
              <div>
                <FaArrowRight size={16} />
              </div>
              <div>
                <Avatar mr={2} size="sm" src={praise.to.icon} />
                {praise.to.name}
              </div>
            </Flex>
          </ModalHeader>
          {/* <ModalHeader>{`${praise.from.name} → ${praise.to.name}`}</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            {isOpen && <PraiseInput defaultMessage={praise.message} handleChangeMessage={setMessage} />}
          </ModalBody>
          <ModalFooter>
            <Button onClick={close} mr={4}>
              キャンセル
            </Button>
            <Button disabled={saving} onClick={handleSave} colorScheme="green">
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PraiseEditor;

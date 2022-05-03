import {
  Button,
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { ChangeEvent, FC } from 'react';

import { TeamSlackWebhook } from '~/domains/slackWebhook';

import { useField, useModal } from './hooks';

interface SlackWebhookEditorProps {
  children: JSX.Element;
  title: string;
  saveButtonText: string;
  teamId: string;
  webhook?: TeamSlackWebhook;
  saving?: boolean;
  refresh: () => void;
  onSave: (url: string, name: string, description: string, close: () => void) => void;
}

const SlackWebhookEditor: FC<SlackWebhookEditorProps> = ({
  children,
  title,
  webhook,
  saveButtonText,
  saving,
  onSave,
}) => {
  const { isOpen, open, close } = useModal();
  const { url, name, description, setUrl, setName, setDescription } = useField(webhook);

  const handleSave = () => {
    onSave(url, name, description, close);
  };

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  return (
    <>
      {React.cloneElement(children, { onClick: open })}
      <Modal size="md" onClose={close} isOpen={isOpen} onCloseComplete={close} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={4}>
              <Flex direction="column" gap={2}>
                <label>名前</label>
                <Input defaultValue={name} onChange={handleChangeName} />
              </Flex>
              <Flex direction="column" gap={2}>
                <label>説明</label>
                <Input defaultValue={description} onChange={handleChangeDescription} />
              </Flex>
              <Flex direction="column" gap={2}>
                <label>URL</label>
                <Input defaultValue={url} onChange={handleChangeUrl} />
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={close} mr={4}>
              キャンセル
            </Button>
            <Button disabled={saving} onClick={handleSave} colorScheme="green">
              {saveButtonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SlackWebhookEditor;

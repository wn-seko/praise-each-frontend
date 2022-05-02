import React, { ChangeEvent, FC } from 'react';
import { ColorResult } from 'react-color';

import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import ColorPicker from '~/components/ui/ColorPicker';
import { Team } from '~/domains/team';
import { User } from '~/domains/user';
import UserSelect from '../../User/UserSelecte';
import { useField, useModal, useUserSelect } from './hooks';

interface TeamEditorProps {
  team?: Team;
  loading: boolean;
  title: string;
  children: JSX.Element;
  saveButtonText: string;
  onSave: (name: string, color: string, users: User[], close: () => void) => void;
}

const TeamEditor: FC<TeamEditorProps> = ({ team, loading, title, children, saveButtonText, onSave }) => {
  const { isOpen, open, close } = useModal();
  const { name, color, setName, setColor } = useField(team);
  const { selectedUsers, addUser, removeUser } = useUserSelect(team?.users);

  const handleSave = () => {
    onSave(name, color, selectedUsers, close);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleChangeColor = (color: ColorResult) => {
    setColor(color.hex);
  };

  return (
    <>
      {React.cloneElement(children, { onClick: open })}
      <Modal size="xl" onClose={close} isOpen={isOpen} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <Flex direction="column" gap={4}>
              <Box>
                <label>チーム名</label>
                <Input defaultValue={name} onChange={handleChangeName} />
              </Box>
              <Box>
                <label>チームカラー</label>
                <ColorPicker width="100%" color={color} onChangeComplete={handleChangeColor} />
              </Box>
              <Box>
                <label>ユーザー</label>
                <UserSelect users={selectedUsers} addUser={addUser} removeUser={removeUser} />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={close} mr={4}>
              キャンセル
            </Button>
            <Button disabled={loading} onClick={handleSave} colorScheme="green">
              {saveButtonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TeamEditor;

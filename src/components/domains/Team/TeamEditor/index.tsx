import React, { ChangeEvent, FC } from 'react';
import { ColorResult } from 'react-color';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import ColorPicker from '~/components/ui/ColorPicker';
import { Team } from '~/domains/team';
import { User } from '~/domains/user';
import UserSelect from '../../User/UserSelecte';
import { useField, useModal, useUserSelect } from './hooks';

interface TeamEditorProps {
  team?: Team;
  loading: boolean;
  title: string;
  trigger: React.ReactNode;
  saveButtonText: string;
  onSave: (name: string, color: string, users: User[], close: () => void) => void;
}

const TeamEditor: FC<TeamEditorProps> = ({ team, loading, title, trigger, saveButtonText, onSave }) => {
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
    <Modal size="small" onClose={close} onOpen={open} open={isOpen} trigger={trigger}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>チーム名</label>
            <Input defaultValue={name} onChange={handleChangeName} />
          </Form.Field>
          <Form.Field>
            <label>チームカラー</label>
            <ColorPicker width="50%" color={color} onChangeComplete={handleChangeColor} />
          </Form.Field>
          <Form.Field>
            <label>ユーザー</label>
            <UserSelect users={selectedUsers} addUser={addUser} removeUser={removeUser} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close}>キャンセル</Button>
        <Button loading={loading} onClick={handleSave} positive={true}>
          {saveButtonText}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TeamEditor;

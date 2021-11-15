import React, { ChangeEvent, FC } from 'react';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
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
    <Modal
      size="small"
      onClose={close}
      onOpen={open}
      open={isOpen}
      trigger={<Button primary={true}>タグを追加</Button>}
    >
      <Modal.Header>タグを追加</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>タグ名</label>
            <Input defaultValue={name} onChange={handleChangeName} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close}>キャンセル</Button>
        <Button loading={creating} onClick={onSave} positive={true}>
          追加
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateTag;

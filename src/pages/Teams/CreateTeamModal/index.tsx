import React, { ChangeEvent, FC } from 'react';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import { useField, useModal, useTeam } from './hooks';

const CreateTeamModal: FC = () => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const { name, color, setName, setColor } = useField();
  const { loading, handleSubmitTeam } = useTeam(name, color, handleClose);

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.currentTarget.value);
  };

  return (
    <Modal
      size="small"
      onClose={handleClose}
      onOpen={handleOpen}
      open={isOpen}
      trigger={<Button primary={true}>チームを作成</Button>}
    >
      <Modal.Header>チームを作成</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>チーム名</label>
            <Input onChange={handleChangeName} />
          </Form.Field>
          <Form.Field>
            <label>チームカラー</label>
            <Input onChange={handleChangeColor} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button loading={loading} onClick={handleSubmitTeam} positive={true}>
          作成
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateTeamModal;

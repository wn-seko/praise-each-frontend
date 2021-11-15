import React, { ChangeEvent, FC } from 'react';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import { TeamSlackWebhook } from '~/domains/slackWebhook';
import { useModal, useField } from './hooks';

interface SlackWebhookEditorProps {
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
    <Modal size="small" onClose={close} onOpen={open} open={isOpen} trigger={children}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>名前</label>
            <Input defaultValue={name} onChange={handleChangeName} />
          </Form.Field>
          <Form.Field>
            <label>説明</label>
            <Input defaultValue={description} onChange={handleChangeDescription} />
          </Form.Field>
          <Form.Field>
            <label>URL</label>
            <Input defaultValue={url} onChange={handleChangeUrl} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close}>キャンセル</Button>
        <Button loading={saving} onClick={handleSave} positive={true}>
          {saveButtonText}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SlackWebhookEditor;

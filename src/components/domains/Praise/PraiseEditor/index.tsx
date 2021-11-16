import React, { FC } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
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
    <Modal size="small" onClose={close} onOpen={open} open={isOpen} trigger={children}>
      <Modal.Header>{`${praise.from.name} → ${praise.to.name}`}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            {isOpen && <PraiseInput defaultMessage={praise.message} handleChangeMessage={setMessage} />}
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close}>キャンセル</Button>
        <Button loading={saving} onClick={handleSave} positive={true}>
          保存
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PraiseEditor;

import { Button } from '@chakra-ui/react';
import React, { FC } from 'react';

import ConfirmModal from '~/components/ui/ConfirmModal';
import Segment from '~/components/ui/Segment';
import { useModal } from '~/hooks/useModal';

import { useTeam } from './hooks';

interface DeleteTeamProps {
  teamId: string;
}

const DeleteTeam: FC<DeleteTeamProps> = ({ teamId }) => {
  const { isOpen, open, close } = useModal();
  const { loading, handleConfirm } = useTeam(teamId, close);

  return (
    <>
      <Segment title="チームを削除">
        <Button width={200} colorScheme="red" onClick={open}>
          チームを削除
        </Button>
      </Segment>
      <ConfirmModal
        title="チームを削除"
        message="この操作は取り消せません。よろしいですか？"
        buttonText="チームを削除"
        buttonType="negative"
        isOpen={isOpen}
        loading={loading}
        handleConfirm={handleConfirm}
        handleClose={close}
      />
    </>
  );
};

export default DeleteTeam;

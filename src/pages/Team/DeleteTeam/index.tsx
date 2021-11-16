import React, { FC } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import ConfirmModal from '~/components/ui/ConfirmModal';
import SegmentContainer from '~/components/ui/SegmentContainer';
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
      <SegmentContainer title="チームを削除">
        <Segment.Group>
          <Segment>
            <Button negative={true} onClick={open}>
              チームを削除
            </Button>
          </Segment>
        </Segment.Group>
      </SegmentContainer>
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

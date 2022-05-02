import React, { FC } from 'react';
import { Button } from '@chakra-ui/react';
import TeamEditor from '~/components/domains/Team/TeamEditor';
import { useCreateTeam } from './hooks';

const CreateTeam: FC = () => {
  const { creating, handleSave } = useCreateTeam();

  return (
    <TeamEditor loading={creating} title="チームを作成" saveButtonText="作成" onSave={handleSave}>
      <Button colorScheme="green">チームを作成</Button>
    </TeamEditor>
  );
};

export default CreateTeam;

import React, { FC } from 'react';
import { Button } from 'semantic-ui-react';
import TeamEditor from '~/components/domains/Team/TeamEditor';
import { useCreateTeam } from './hooks';

const CreateTeam: FC = () => {
  const { creating, handleSave } = useCreateTeam();

  return (
    <TeamEditor
      loading={creating}
      title="チームを作成"
      trigger={<Button primary={true}>チームを作成</Button>}
      saveButtonText="作成"
      onSave={handleSave}
    />
  );
};

export default CreateTeam;

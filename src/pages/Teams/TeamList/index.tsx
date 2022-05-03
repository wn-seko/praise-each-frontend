import { Alert, AlertIcon } from '@chakra-ui/react';
import React, { FC } from 'react';

import TeamListComponent from '~/components/domains/Team/TeamList';

import { useTeams } from './hooks';

const TeamList: FC = () => {
  const { teams } = useTeams();

  return teams.length > 0 ? (
    <TeamListComponent>
      {teams.map((team) => (
        <TeamListComponent.Item key={team.id} team={team} href={`/teams/${team.id}`} />
      ))}
    </TeamListComponent>
  ) : (
    <Alert status="info">
      <AlertIcon />
      まだチームがありません
    </Alert>
  );
};

export default TeamList;

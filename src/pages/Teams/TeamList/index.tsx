import React, { FC, useCallback } from 'react';
import { Message } from 'semantic-ui-react';
import TeamListComponent from '~/components/domains/Team/TeamList';
import { useTeams, useRouting } from './hooks';

const TeamList: FC = () => {
  const { teams } = useTeams();
  const { redirect } = useRouting();

  const createHandleClickTeam = useCallback(
    (teamId: string) => () => {
      redirect(teamId);
    },
    [],
  );

  return teams.length > 0 ? (
    <TeamListComponent>
      {teams.map((team) => (
        <TeamListComponent.Item key={team.id} team={team} onClick={createHandleClickTeam(team.id)} />
      ))}
    </TeamListComponent>
  ) : (
    <Message info={true} content="まだチームがありません" />
  );
};

export default TeamList;

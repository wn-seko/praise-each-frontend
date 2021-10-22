import styled from '@emotion/styled';
import React, { FC, useCallback } from 'react';
import { Button, Container, Message } from 'semantic-ui-react';
import TeamList from '~/components/domains/Team/TeamList';
import TeamEditor from '~/components/domains/Team/TeamEditor';
import DefaultLayout from '~/layouts/default';
import { useTeams, useRouting, useCreateTeam } from './hooks';

const RightPositionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TeamsPage: FC = () => {
  const { fetching, teams } = useTeams();
  const { creating, handleSave } = useCreateTeam();
  const { redirect } = useRouting();

  const createHandleClickTeam = useCallback(
    (teamId: string) => () => {
      redirect(teamId);
    },
    [],
  );

  return (
    <DefaultLayout loading={fetching}>
      <Container>
        <RightPositionContainer>
          <TeamEditor
            loading={creating}
            title="チームを作成"
            trigger={<Button primary={true}>チームを作成</Button>}
            saveButtonText="作成"
            onSave={handleSave}
          />
        </RightPositionContainer>
        {teams.length > 0 ? (
          <TeamList>
            {teams.map((team) => (
              <TeamList.Item key={team.id} team={team} onClick={createHandleClickTeam(team.id)} />
            ))}
          </TeamList>
        ) : (
          <Message info={true} content="まだチームがありません" />
        )}
      </Container>
    </DefaultLayout>
  );
};

export default TeamsPage;

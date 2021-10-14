import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Container, Message } from 'semantic-ui-react';
import TeamList from '~/components/ui/TeamList';
import DefaultLayout from '~/layouts/default';
import CreateTeamModal from './CreateTeamModal';
import { useTeams } from './hooks';

const RightPositionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TeamsPage: FC = () => {
  const { loading, teams } = useTeams();

  return (
    <DefaultLayout loading={loading}>
      <Container>
        <RightPositionContainer>
          <CreateTeamModal />
        </RightPositionContainer>
        {teams.length > 0 ? (
          <TeamList>
            {teams.map((team) => (
              <TeamList.Item key={team.id} team={team} />
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

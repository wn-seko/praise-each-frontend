import styled from '@emotion/styled';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Header } from 'semantic-ui-react';
import Box from '~/components/ui/Box';
import DefaultLayout from '~/layouts/default';
import DeleteTeam from './DeleteTeam';
import ExternalConnectionSettings from './ExternalConnectionSettings';
import GeneralSettings from './GeneralSettings';
import { useTeam } from './hooks';

interface Params {
  teamId: string;
}

const HeaderContainer = styled.div`
  margin: 1em 0;
  display: inline-flex;
  align-items: center;

  > * {
    margin-top: 0 !important;
    margin-right: 0.5em;
  }
`;

const TeamPage: FC<RouteComponentProps<Params>> = ({ match }) => {
  const { loading, team } = useTeam(match.params.teamId);

  return (
    <DefaultLayout loading={loading}>
      {team && (
        <Container>
          <HeaderContainer>
            <Box size={20} color={team.color} />
            <Header as="h2">{team.name}</Header>
          </HeaderContainer>
          <GeneralSettings team={team} />
          <ExternalConnectionSettings />
          <DeleteTeam teamId={team.id} />
        </Container>
      )}
    </DefaultLayout>
  );
};

export default TeamPage;

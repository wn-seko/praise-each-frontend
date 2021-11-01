import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Box from '~/components/ui/Box';
import { useTeam } from './hooks';
import DeleteTeam from '../DeleteTeam';
import ExternalConnectionSettings from '../ExternalConnectionSettings';
import GeneralSettings from '../GeneralSettings';

const HeaderContainer = styled.div`
  margin: 1em 0;
  display: inline-flex;
  align-items: center;

  > * {
    margin-top: 0 !important;
    margin-right: 0.5em;
  }
`;

interface OverviewProps {
  teamId: string;
}

const Overview: FC<OverviewProps> = ({ teamId }) => {
  const { team } = useTeam(teamId);

  return (
    team && (
      <Container>
        <HeaderContainer>
          <Box size={20} color={team.color} />
          <Header as="h2">{team.name}</Header>
        </HeaderContainer>
        <GeneralSettings team={team} />
        <ExternalConnectionSettings />
        <DeleteTeam teamId={team.id} />
      </Container>
    )
  );
};

export default Overview;

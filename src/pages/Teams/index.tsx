import styled from '@emotion/styled';
import React, { FC, Suspense } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import DefaultLayout from '~/layouts/default';
import TeamList from './TeamList';
import CreateTeam from './CreateTeam';

const RightPositionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TeamsPage: FC = () => (
  <DefaultLayout>
    <Container>
      <RightPositionContainer>
        <CreateTeam />
      </RightPositionContainer>
      <Suspense fallback={<Loader active={true}>Loading...</Loader>}>
        <TeamList />
      </Suspense>
    </Container>
  </DefaultLayout>
);

export default TeamsPage;

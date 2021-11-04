import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Avatar from '~/components/ui/Avatar';
import AccountSettings from '../AccountSettings';
import GeneralSettings from '../GeneralSettings';
import { useUser } from './hooks';

const HeaderContainer = styled.div`
  margin: 1em 0;
  display: inline-flex;
  align-items: center;

  > * {
    margin-top: 0 !important;
    margin-right: 1em !important;
  }
`;

const Overview: FC = () => {
  const { user } = useUser();

  return (
    user && (
      <Container>
        <HeaderContainer>
          <Avatar src={user?.icon} size="medium" />
          <Header as="h2">{user.name}</Header>
        </HeaderContainer>
        <GeneralSettings user={user} />
        <AccountSettings />
      </Container>
    )
  );
};

export default Overview;

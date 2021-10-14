import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Icon, List } from 'semantic-ui-react';
import { Team } from '~/domains/team';
import Box from '../../Box';

interface TeamItemProps {
  team: Team;
}

const HeaderContainer = styled.div`
  display: inline-flex;
  align-items: center;

  > * {
    margin-right: 0.5em;
  }
`;

const DescriptionContainer = styled.div`
  font-size: 14px;
  font-weight: normal;
  display: inline-flex;
  align-items: center;
  margin: 0.5em 0.5em 0.2em;

  > * {
    margin-right: 0.5em !important;
  }
`;

const TeamItem: FC<TeamItemProps> = ({ team }) => {
  return (
    <List.Item key={team.id}>
      <List.Content verticalAlign="middle">
        <List.Header as="a">
          <HeaderContainer>
            <Box size={15} color={team.color} />
            <span>{team.name}</span>
          </HeaderContainer>
        </List.Header>
        <List.Description>
          <DescriptionContainer>
            <Icon name="users" size="large" />
            <span>{`${team.users.length} ユーザー`}</span>
          </DescriptionContainer>
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default TeamItem;

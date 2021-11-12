import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Header, Icon, List, Message, Segment } from 'semantic-ui-react';
import Box from '~/components/ui/Box';
import SegmentContainer from '~/components/ui/SegmentContainer';
import { useMyTeams } from './hooks';

const InlineBlock = styled.div`
  cursor: pointer;
  display: inline-flex;

  > i {
    margin-right: 1em;
  }

  > * {
    margin-right: 0.5em;
  }
`;

const TeamPinSettings: FC = () => {
  const { teams } = useMyTeams();

  return (
    <SegmentContainer title="タイムライン">
      <Segment.Group>
        <Segment>
          <Header as="h4">チームタイムライン</Header>
          {teams.length > 0 ? (
            <List>
              {teams.map((team) => (
                <List.Item key={team.id}>
                  <InlineBlock onClick={team.onClick}>
                    <Icon name="pin" color={team.pined ? 'red' : 'grey'} />
                    <Box size={15} color={team.color} />
                    {team.name}
                  </InlineBlock>
                </List.Item>
              ))}
            </List>
          ) : (
            <Message info={true} content="チームに所属していません" />
          )}
        </Segment>
      </Segment.Group>
    </SegmentContainer>
  );
};

export default TeamPinSettings;

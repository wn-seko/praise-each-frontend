import React, { FC } from 'react';
import { Header, List, Message, Segment } from 'semantic-ui-react';
import SegmentContainer from '~/components/ui/SegmentContainer';
import { useMyTeams } from './hooks';

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
                <List.Item key={team.id}>{team.name}</List.Item>
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

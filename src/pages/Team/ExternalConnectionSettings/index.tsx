import React, { FC } from 'react';
import { Header, Segment, Message } from 'semantic-ui-react';
import SegmentContainer from '~/components/ui/SegmentContainer';

const ExternalConnectionSettings: FC = () => {
  return (
    <SegmentContainer title="外部連携">
      <Segment.Group>
        <Segment>
          <Header as="h4">Slack WebHooks</Header>
          <Message info={true} content="Coming soon..." />
        </Segment>
      </Segment.Group>
    </SegmentContainer>
  );
};

export default ExternalConnectionSettings;

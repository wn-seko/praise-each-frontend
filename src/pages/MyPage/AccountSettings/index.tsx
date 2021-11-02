import React, { FC } from 'react';
import { Header, Segment, Message } from 'semantic-ui-react';
import SegmentContainer from '~/components/ui/SegmentContainer';

const AccountSettings: FC = () => {
  return (
    <SegmentContainer title="アカウント">
      <Segment.Group>
        <Segment>
          <Header as="h4">ログインアカウント</Header>
          <Message info={true} content="Coming soon..." />
        </Segment>
      </Segment.Group>
    </SegmentContainer>
  );
};

export default AccountSettings;

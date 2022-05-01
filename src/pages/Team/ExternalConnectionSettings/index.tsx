import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Header, Segment, Message, Button, List } from 'semantic-ui-react';
import { BothContainer } from '~/components/ui/Container';
import SegmentContainer from '~/components/ui/Segment';
import SlackWebhookEditor from '../SlackWebhookEditor';
import {
  useAddTeamSlackWebhook,
  useDeleteTeamSlackWebhook,
  useTeamSlackWebhook,
  useUpdateTeamSlackWebhook,
} from './hooks';

interface ExternalConnectionSettingsProps {
  teamId: string;
}

const ButtonContainer = styled.div`
  > * {
    margin-left: 0.5em !important;
  }
`;

const ExternalConnectionSettings: FC<ExternalConnectionSettingsProps> = ({ teamId }) => {
  const { teamSlackWebhooks, refetch } = useTeamSlackWebhook(teamId);
  const { creating, handleAdd } = useAddTeamSlackWebhook(teamId, refetch);
  const { updating, createHandleUpdate } = useUpdateTeamSlackWebhook(teamId, refetch);
  const { deleting, createHandleDelete } = useDeleteTeamSlackWebhook(refetch);

  return (
    <SegmentContainer title="外部連携">
      <Segment.Group>
        <Segment>
          <Header as="h4">
            <BothContainer>
              <span>Slack WebHooks</span>
              <SlackWebhookEditor
                title="追加"
                saveButtonText="追加"
                teamId={teamId}
                saving={creating}
                refresh={refetch}
                onSave={handleAdd}
              >
                <Button primary={true} size="small">
                  追加
                </Button>
              </SlackWebhookEditor>
            </BothContainer>
          </Header>
          {teamSlackWebhooks.length > 0 ? (
            <List>
              {teamSlackWebhooks.map((teamSlackWebhook) => (
                <List.Item key={teamSlackWebhook.id}>
                  <BothContainer>
                    <List.Content>
                      <List.Header>{teamSlackWebhook.name}</List.Header>
                      <List.Description>{teamSlackWebhook.description}</List.Description>
                    </List.Content>
                    <ButtonContainer>
                      <SlackWebhookEditor
                        title="編集"
                        saveButtonText="保存"
                        teamId={teamId}
                        webhook={teamSlackWebhook}
                        saving={updating}
                        refresh={refetch}
                        onSave={createHandleUpdate(teamSlackWebhook.id)}
                      >
                        <Button size="small">編集</Button>
                      </SlackWebhookEditor>
                      <Button negative={true} loading={deleting} onClick={createHandleDelete(teamSlackWebhook.id)}>
                        削除
                      </Button>
                    </ButtonContainer>
                  </BothContainer>
                </List.Item>
              ))}
            </List>
          ) : (
            <Message info={true} content="Slack Webhook が登録されていません" />
          )}
        </Segment>
      </Segment.Group>
    </SegmentContainer>
  );
};

export default ExternalConnectionSettings;

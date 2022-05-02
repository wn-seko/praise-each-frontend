import React, { FC, useMemo } from 'react';
import { Alert, AlertIcon, Button, Box, Flex, Spinner } from '@chakra-ui/react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Segment from '~/components/ui/Segment';
import SlackWebhookEditor from '../SlackWebhookEditor';
import {
  useAddTeamSlackWebhook,
  useDeleteTeamSlackWebhook,
  useTeamSlackWebhook,
  useUpdateTeamSlackWebhook,
} from './hooks';

interface SlackWebhookSettingsProps {
  teamId: string;
}

const SlackWebhookSettings: FC<SlackWebhookSettingsProps> = ({ teamId }) => {
  const { teamSlackWebhooks, refetch } = useTeamSlackWebhook(teamId);
  const { creating, handleAdd } = useAddTeamSlackWebhook(teamId, refetch);
  const { updating, createHandleUpdate } = useUpdateTeamSlackWebhook(teamId, refetch);
  const { deleting, createHandleDelete } = useDeleteTeamSlackWebhook(refetch);

  const SegmentHeader = useMemo(
    () => (
      <Flex alignItems="center" justifyContent="space-between">
        <span>Slack WebHooks</span>
        <SlackWebhookEditor
          title="追加"
          saveButtonText="追加"
          teamId={teamId}
          saving={creating}
          refresh={refetch}
          onSave={handleAdd}
        >
          <Button colorScheme="green">追加</Button>
        </SlackWebhookEditor>
      </Flex>
    ),
    [teamId, creating, refetch, handleAdd],
  );

  return (
    <Segment title={SegmentHeader}>
      {teamSlackWebhooks.length > 0 ? (
        <Flex direction="column" gap={4}>
          {teamSlackWebhooks.map((teamSlackWebhook) => (
            <Flex key={teamSlackWebhook.id} alignItems="center" justifyContent="space-between">
              <Box>
                <Box>{teamSlackWebhook.name}</Box>
                <Box color="gray.400" fontWeight="semibold" fontSize="sm">
                  {teamSlackWebhook.description}
                </Box>
              </Box>
              <Flex alignItems="center" gap={4}>
                <SlackWebhookEditor
                  title="編集"
                  saveButtonText="保存"
                  teamId={teamId}
                  webhook={teamSlackWebhook}
                  saving={updating}
                  refresh={refetch}
                  onSave={createHandleUpdate(teamSlackWebhook.id)}
                >
                  <FaEdit cursor="pointer" size={20} />
                </SlackWebhookEditor>
                {deleting ? (
                  <Spinner size="sm" />
                ) : (
                  <FaTrashAlt cursor="pointer" size={20} onClick={createHandleDelete(teamSlackWebhook.id)} />
                )}
              </Flex>
            </Flex>
          ))}
        </Flex>
      ) : (
        <Alert status="info">
          <AlertIcon />
          Slack Webhooks が登録されていません
        </Alert>
      )}
    </Segment>
  );
};

export default SlackWebhookSettings;

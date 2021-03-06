import { Avatar, Alert, AlertIcon, Button, Flex } from '@chakra-ui/react';
import React, { FC, useMemo } from 'react';

import TeamEditor from '~/components/domains/Team/TeamEditor';
import { ColoredLabel } from '~/components/ui/ColoredLabel';
import Segment from '~/components/ui/Segment';
import { Team } from '~/domains/team';

import { useUpdateTeam } from './hooks';

interface GeneralSettingsProps {
  team: Team;
}

const GeneralSettings: FC<GeneralSettingsProps> = ({ team }) => {
  const { updating, handleSave } = useUpdateTeam(team.id);

  const SegmentHeader = useMemo(
    () => (
      <Flex alignItems="center" justifyContent="space-between">
        <span>設定</span>
        <TeamEditor team={team} loading={updating} title={team.name} saveButtonText="保存" onSave={handleSave}>
          <Button>編集</Button>
        </TeamEditor>
      </Flex>
    ),
    [team],
  );

  return (
    <Segment title={SegmentHeader}>
      <Segment.Item title="チーム名">
        <div>{team.name}</div>
      </Segment.Item>
      <Segment.Item title="チームカラー">
        <ColoredLabel color={team.color}>{team.color}</ColoredLabel>
      </Segment.Item>
      <Segment.Item title="ユーザー">
        {team.users.length > 0 ? (
          <Flex gap={4}>
            {team.users.map((user) => (
              <Flex key={user.id}>
                <Avatar size="xs" mr={2} src={user.icon} />
                <span>{user.name}</span>
              </Flex>
            ))}
          </Flex>
        ) : (
          <Alert status="info">
            <AlertIcon />
            ユーザーがいません。
          </Alert>
        )}
      </Segment.Item>
    </Segment>
  );
};

export default GeneralSettings;

import React, { FC, useMemo } from 'react';
import { ColoredLabel } from '~/components/ui/ColoredLabel';
import Segment from '~/components/ui/Segment';
import { Avatar, Alert, AlertIcon, Button, Flex } from '@chakra-ui/react';
import { Team } from '~/domains/team';
import TeamEditor from '~/components/domains/Team/TeamEditor';
import { useUpdateTeam } from './hooks';
import { BothContainer } from '~/components/ui/Container';

interface GeneralSettingsProps {
  team: Team;
}

const GeneralSettings: FC<GeneralSettingsProps> = ({ team }) => {
  const { updating, handleSave } = useUpdateTeam(team.id);

  const EditButton = useMemo(() => <Button>編集</Button>, []);

  const SegmentHeader = useMemo(
    () => (
      <BothContainer>
        <span>設定</span>
        <TeamEditor
          team={team}
          loading={updating}
          title={team.name}
          trigger={EditButton}
          saveButtonText="保存"
          onSave={handleSave}
        />
      </BothContainer>
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
          <Flex>
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

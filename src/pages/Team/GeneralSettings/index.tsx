import React, { FC, useMemo } from 'react';
import { ColoredLabel } from '~/components/ui/ColoredLabel';
import { Button, Header, List, Message, Segment } from 'semantic-ui-react';
import SegmentContainer from '~/components/ui/Segment';
import { Team } from '~/domains/team';
import Avatar from '~/components/ui/Avatar';
import TeamEditor from '~/components/domains/Team/TeamEditor';
import { useUpdateTeam } from './hooks';
import { BothContainer } from '~/components/ui/Container';

interface GeneralSettingsProps {
  team: Team;
}

const GeneralSettings: FC<GeneralSettingsProps> = ({ team }) => {
  const { updating, handleSave } = useUpdateTeam(team.id);

  const EditButton = useMemo(
    () => (
      <Button primary={true} size="small">
        編集
      </Button>
    ),
    [],
  );

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
    <SegmentContainer title={SegmentHeader}>
      <Segment.Group>
        <Segment>
          <Header as="h4">チーム名</Header>
          <div>{team.name}</div>
          <Header as="h4">チームカラー</Header>
          <ColoredLabel color={team.color}>{team.color}</ColoredLabel>
          <Header as="h4">ユーザー</Header>
          {team.users.length > 0 ? (
            <List>
              {team.users.map((user) => (
                <List.Item key={user.id}>
                  <Avatar size="mini" src={user.icon} />
                  <List.Content>{user.name}</List.Content>
                </List.Item>
              ))}
            </List>
          ) : (
            <Message info={true} content="ユーザーがいません。" />
          )}
        </Segment>
      </Segment.Group>
    </SegmentContainer>
  );
};

export default GeneralSettings;

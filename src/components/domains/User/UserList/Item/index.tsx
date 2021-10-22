import React, { FC } from 'react';
import { List } from 'semantic-ui-react';
import Avatar from '~/components/ui/Avatar';
import { ColoredLabel } from '~/components/ui/ColoredLabel';
import { User } from '~/domains/user';

interface UserItemProps {
  user: User;
}

const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <List.Item key={user.id}>
      <Avatar size="medium" src={user.icon} />
      <List.Content>
        <List.Header as="a">{user.name}</List.Header>
        <List.Description>
          {user.teams.map((team) => (
            <ColoredLabel key={team.id} color={team.color} size="tiny">
              {team.name}
            </ColoredLabel>
          ))}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default UserItem;

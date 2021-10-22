import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Form, Icon, Input, List } from 'semantic-ui-react';
import Avatar from '~/components/ui/Avatar';
import { User } from '~/domains/user';
import { useUserList, useUserSelect } from './hooks';

const BothContainer = styled.div`
  display: inline-flex;
  align-content: space-between;
`;

const PositionRightIcon = styled(Icon)`
  position: absolute;
  right: 1em;
`;

const MarginedAvatar = styled(Avatar)`
  margin-left: 1em !important;
`;

interface UserSelectProps {
  onChange?: (users: User[]) => void;
}

const UserSelect: FC<UserSelectProps> = ({ onChange }) => {
  const { selectedUsers, addUser, removeUser } = useUserSelect(onChange);
  const { userList, handleChangeWord } = useUserList(selectedUsers);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeWord(event.currentTarget.value);
  };

  const isSelected = (user: User) => {
    return selectedUsers.find((selectedUser) => selectedUser.id === user.id);
  };

  const createHandleClickItem = (user: User) => () => {
    if (isSelected(user)) {
      removeUser(user);
    } else {
      addUser(user);
    }
  };

  return (
    <Form>
      <Input onChange={handleChangeInput} />
      <List divided={true}>
        {selectedUsers.concat(userList).map((user) => (
          <List.Item key={user.id} onClick={createHandleClickItem(user)}>
            <MarginedAvatar size="mini" src={user.icon} />
            <List.Content verticalAlign="middle">
              <List.Header>
                <BothContainer>
                  <span>{user.name}</span>
                  {isSelected(user) && <PositionRightIcon color="green" name="check" />}
                </BothContainer>
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Form>
  );
};

export default UserSelect;

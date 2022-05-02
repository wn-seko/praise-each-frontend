import React, { FC } from 'react';
import { Avatar, Flex, Input } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { User } from '~/domains/user';
import { useUserList } from './hooks';

interface UserSelectProps {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (user: User) => void;
}

const UserSelect: FC<UserSelectProps> = ({ users: selectedUsers, addUser, removeUser }) => {
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
    <Flex direction="column">
      <Input onChange={handleChangeInput} />
      <Flex padding="0 5px" mt={1} direction="column">
        {selectedUsers.concat(userList).map((user) => (
          <Flex key={user.id} justifyContent="space-between">
            <Flex cursor="pointer" alignItems="center" onClick={createHandleClickItem(user)} gap={2}>
              <Avatar size="2xs" mr={1} src={user.icon} />
              <span>{user.name}</span>
            </Flex>
            {isSelected(user) && <FaCheck color="green" name="check" />}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default UserSelect;

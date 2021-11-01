import { useCallback, useState } from 'react';
import { Team } from '~/domains/team';
import { User } from '~/domains/user';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, open, close };
};

export const useField = (team?: Team) => {
  const [name, setName] = useState(team?.name ?? '');
  const [color, setColor] = useState(team?.color ?? '#000000');
  return { name, color, setName, setColor };
};

export const useUserSelect = (users?: User[]) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>(users || []);

  const addUser = (user: User) => {
    setSelectedUsers((prev) => prev.concat([user]));
  };

  const removeUser = (user: User) => {
    setSelectedUsers((prev) => prev.filter((prevUser) => prevUser.id !== user.id));
  };

  return { selectedUsers, addUser, removeUser };
};

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
  const [users, setUsers] = useState<User[]>([]);
  return { name, color, users, setName, setColor, setUsers };
};

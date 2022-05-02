import { useHistory } from 'react-router';
import { useColorMode } from '@chakra-ui/react';
import { User } from '~/domains/user';
import { useAuthUser, useAuthToken } from '~/recoil/auth';

export const useHeader = () => {
  const { unsetToken } = useAuthToken();
  const { user } = useAuthUser();
  const history = useHistory();

  const logout = () => {
    unsetToken();
    history.push('/login');
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return { user: user as User, colorMode, logout, toggleColorMode };
};

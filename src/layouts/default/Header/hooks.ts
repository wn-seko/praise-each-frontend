import { useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { User } from '~/domains/user';
import { useAuthUser, useAuthToken } from '~/recoil/auth';

export const useHeader = () => {
  const { unsetToken } = useAuthToken();
  const { user } = useAuthUser();
  const navigate = useNavigate();

  const logout = () => {
    unsetToken();
    navigate('/login');
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return { user: user as User, colorMode, logout, toggleColorMode };
};

import { useHistory } from 'react-router';
import { User } from '~/domains/user';
import { useAuthUser, useAuthToken } from '~/recoil/auth';

export const useHeader = () => {
  const { unsetToken } = useAuthToken();
  const { user } = useAuthUser();
  const history = useHistory();

  const createClickMenuHandler = (page: string) => () => {
    history.push(`/${page}`);
  };

  const logout = () => {
    unsetToken();
    history.push('/login');
  };

  return { user: user as User, createClickMenuHandler, logout };
};

import { useHistory } from 'react-router';
import { User } from '~/domains/user';
import { useAuthUser } from '~/recoil/auth';

type Page = 'top' | 'users' | 'teams' | 'statistics';

export const useHeader = () => {
  const { user } = useAuthUser();
  const history = useHistory();

  const createClickMenuHandler = (page: Page) => () => {
    history.push(`/${page}`);
  };

  return { user: user as User, createClickMenuHandler };
};

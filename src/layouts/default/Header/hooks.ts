import { useHistory } from 'react-router';
import { User } from '~/domains/user';
import { useAuthUser } from '~/recoil/auth';

type Page = 'top' | 'statistics';

export const useHeader = () => {
  const { user } = useAuthUser();
  const history = useHistory();

  const createClickMenuHandler = (page: Page) => () => {
    switch (page) {
      case 'top':
        history.push('/top');
        break;
      case 'statistics':
        history.push('/statistics');
        break;
    }
  };

  return { user: user as User, createClickMenuHandler };
};

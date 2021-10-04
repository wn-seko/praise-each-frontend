import { useHistory } from 'react-router';

type Page = 'top' | 'statistics';

export const useHeader = () => {
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

  return { createClickMenuHandler };
};

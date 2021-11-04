import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import {
  getTokenFromLocalStorage,
  parseTokenToUser,
  setTokenToLocalStorage,
  unsetTokenFromLocalStorage,
} from '~/domains/auth';
import { User } from '~/domains/user';

const authTokenState = atom<string>({
  key: 'application/auth/token',
  default: getTokenFromLocalStorage(),
});

export const authUserState = selector<User | null>({
  key: 'application/auth/user',
  get: ({ get }) => {
    const jwt = get(authTokenState);
    return parseTokenToUser(jwt);
  },
});

export const useAuthUser = () => {
  const user = useRecoilValue(authUserState);
  return { user };
};

export const useAuthToken = () => {
  const [token, setRecoilToken] = useRecoilState(authTokenState);

  const setToken = (token: string) => {
    setRecoilToken(token);
    setTokenToLocalStorage(token);
  };

  const unsetToken = () => {
    setRecoilToken('');
    unsetTokenFromLocalStorage();
  };

  return { token, setToken, unsetToken };
};

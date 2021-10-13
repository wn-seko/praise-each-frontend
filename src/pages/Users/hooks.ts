import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { searchUser as searchUsersApi } from '~/requests/user';

export const useUsers = () => {
  const [state, searchUsers] = useAsyncFn(async () => searchUsersApi());
  const loading = state.loading;
  const users = state.value?.isSuccess() ? state.value.value : [];

  useEffect(() => {
    searchUsers();
  }, []);

  return { loading, users };
};

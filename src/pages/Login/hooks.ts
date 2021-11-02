import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { fetchOAuthLinks as fetchOAuthLinksApi } from '~/requests/oauth';

interface LoginUrl {
  [name: string]: string;
}

export const useLogin = (): { loading: boolean; urls: LoginUrl } => {
  const [state, fetchOAuthLinks] = useAsyncFn(fetchOAuthLinksApi);
  const urls = state.value?.isSuccess() ? state.value.value : {};
  useEffect(() => {
    fetchOAuthLinks('login');
  }, []);
  return { loading: state.loading, urls };
};

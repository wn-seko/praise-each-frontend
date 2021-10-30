import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { getLoginUrls as getLoginUrlsApi } from '~/requests/oauth';

interface LoginUrl {
  [name: string]: string;
}

export const useLogin = (): { loading: boolean; urls: LoginUrl } => {
  const [state, getLoginUrls] = useAsyncFn(getLoginUrlsApi);
  const urls = state.value?.isSuccess() ? state.value.value : {};
  useEffect(() => {
    getLoginUrls();
  }, []);
  return { loading: state.loading, urls };
};

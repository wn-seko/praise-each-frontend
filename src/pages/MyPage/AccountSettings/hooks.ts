import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { fetchOAuthLinks as fetchOAuthLinksApi } from '~/requests/oauth';

export const useOAuthLinkageLinks = () => {
  const [state, fetchOAuthLinks] = useAsyncFn(fetchOAuthLinksApi);
  const linkageUrls: { [type: string]: string } = state.value?.isSuccess() ? state.value.value : {};

  useEffect(() => {
    fetchOAuthLinks('linkage');
  }, []);

  return { loading: state.loading, linkageUrls };
};

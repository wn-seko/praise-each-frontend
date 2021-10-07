/* eslint-disable node/no-unsupported-features/node-builtins */
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { githubOAuthLogin } from '~/requests/oauth';

export const UseGithubLogin = () => {
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get('code') || '';
  const history = useHistory();

  if (!code) {
    history.push('/login');
    toast.error('ログインに失敗しました');
  }

  githubOAuthLogin(code).then((result) => {
    if (result.isSuccess()) {
      history.push('/');
    } else {
      history.push('/login');
      toast.error('ログインに失敗しました');
    }
  });

  return {};
};

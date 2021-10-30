/* eslint-disable node/no-unsupported-features/node-builtins */
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { githubOAuthLogin, googleOAuthLogin } from '~/requests/oauth';
import { useAuthToken } from '~/recoil/auth';

export const UseGithubLogin = () => {
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get('code') || '';
  const history = useHistory();
  const { setToken } = useAuthToken();

  if (!code) {
    history.push('/login');
    toast.error('ログインに失敗しました');
  }

  githubOAuthLogin(code).then((result) => {
    if (result.isSuccess()) {
      setToken(result.value.token);
      history.push('/');
    } else {
      history.push('/login');
      toast.error('ログインに失敗しました');
    }
  });

  return {};
};

export const UseGoogleLogin = () => {
  const urlSearchParams = new URLSearchParams(location.search);

  const code = urlSearchParams.get('code') || '';

  const history = useHistory();
  const { setToken } = useAuthToken();

  if (!code) {
    history.push('/login');
    toast.error('ログインに失敗しました');
  }

  googleOAuthLogin(code).then((result) => {
    if (result.isSuccess()) {
      setToken(result.value.token);
      history.push('/');
    } else {
      history.push('/login');
      toast.error('ログインに失敗しました');
    }
  });

  return {};
};

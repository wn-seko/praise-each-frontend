/* eslint-disable node/no-unsupported-features/node-builtins */
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { oauthLinkage, oauthLogin, oauthUpdateIcon } from '~/requests/oauth';
import { useAuthToken } from '~/recoil/auth';
import { OAuthType } from '~/domains/oauth';

const useLogin = (type: OAuthType) => {
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get('code') || '';
  const history = useHistory();
  const { setToken } = useAuthToken();

  if (!code) {
    history.push('/login');
    toast.error('ログインに失敗しました');
    return;
  }

  oauthLogin(type, code).then((result) => {
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

const useUpdateIcon = (type: OAuthType) => {
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get('code') || '';
  const history = useHistory();
  const { setToken } = useAuthToken();

  if (!code) {
    history.push('/mypage/settings');
    toast.error('認証に失敗しました');
    return;
  }

  oauthUpdateIcon(type, code).then((result) => {
    history.push('/mypage/settings');

    if (result.isSuccess()) {
      setToken(result.value.token);
      toast.success('更新しました');
    } else {
      toast.error('更新に失敗しました');
    }
  });

  return {};
};

const useLinkage = (type: OAuthType) => {
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get('code') || '';
  const history = useHistory();

  if (!code) {
    history.push('/mypage/settings');
    toast.error('認証に失敗しました');
    return;
  }

  oauthLinkage(type, code).then((result) => {
    history.push('/mypage/settings');

    if (result.isSuccess()) {
      toast.success('アカウントを連携しました');
    } else {
      toast.error('アカウント連携に失敗しました');
    }
  });

  return {};
};

export const useOauthCallback = (type: OAuthType) => {
  const urlSearchParams = new URLSearchParams(location.search);
  const state = urlSearchParams.get('state') || '';

  switch (state) {
    case 'login':
      return useLogin(type);
    case 'update_icon':
      return useUpdateIcon(type);
    case 'linkage':
      return useLinkage(type);
    default:
      return {};
  }
};

/* eslint-disable node/no-unsupported-features/node-builtins */
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { OAuthType } from '~/domains/oauth';
import { useAuthToken } from '~/recoil/auth';
import { oauthLinkage, oauthLogin, oauthUpdateIcon } from '~/requests/oauth';

const useLogin = (type: OAuthType) => {
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get('code') || '';
  const navigate = useNavigate();
  const { setToken } = useAuthToken();

  if (!code) {
    navigate('/login');
    toast.error('ログインに失敗しました');
    return;
  }

  oauthLogin(type, code).then((result) => {
    if (result.isSuccess()) {
      setToken(result.value.token);
      navigate('/');
    } else {
      navigate('/login');
      toast.error('ログインに失敗しました');
    }
  });

  return {};
};

const useUpdateIcon = (type: OAuthType) => {
  const urlSearchParams = new URLSearchParams(location.search);
  const code = urlSearchParams.get('code') || '';
  const navigate = useNavigate();
  const { setToken } = useAuthToken();

  if (!code) {
    navigate('/mypage/settings');
    toast.error('認証に失敗しました');
    return;
  }

  oauthUpdateIcon(type, code).then((result) => {
    navigate('/mypage/settings');

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
  const navigate = useNavigate();

  if (!code) {
    navigate('/mypage/settings');
    toast.error('認証に失敗しました');
    return;
  }

  oauthLinkage(type, code).then((result) => {
    navigate('/mypage/settings');

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

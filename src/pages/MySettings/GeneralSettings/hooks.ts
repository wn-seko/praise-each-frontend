import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAsyncFn } from 'react-use';

import { User } from '~/domains/user';
import { useAuthToken } from '~/recoil/auth';
import { fetchOAuthLinks as fetchOAuthLinksApi } from '~/requests/oauth';
import { updateUser } from '~/requests/user';

export const useOAuthUpdateIconLinks = () => {
  const [state, fetchOAuthLinks] = useAsyncFn(fetchOAuthLinksApi);
  const updateIconUrls: { [type: string]: string } = state.value?.isSuccess() ? state.value.value : {};

  useEffect(() => {
    fetchOAuthLinks('update_icon');
  }, []);

  return { loading: state.loading, updateIconUrls };
};

export const useField = (user: User) => {
  const [nameInputValue, setNameInputValue] = useState(user.name);
  const [isEditName, setIsEditName] = useState(false);
  const { setToken } = useAuthToken();

  const edit = () => {
    setIsEditName(true);
  };

  const handleSaveName = async () => {
    const updateUserResult = await updateUser(nameInputValue);

    if (updateUserResult.isFailure()) {
      toast.error('保存に失敗しました');
      return;
    }

    setToken(updateUserResult.value.token);
    toast.success('更新しました');
    setIsEditName(false);
  };

  return { isEditName, edit, handleSaveName, nameInputValue, setNameInputValue };
};

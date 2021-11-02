import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAsyncFn } from 'react-use';
import { User } from '~/domains/user';
import { getLoginUrls as getLoginUrlsApi } from '~/requests/oauth';
import { updateUser } from '~/requests/user';

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

export const useField = (user: User) => {
  const [nameInputValue, setNameInputValue] = useState(user.name);
  const [isEditName, setIsEditName] = useState(false);

  const edit = () => {
    setIsEditName(true);
  };

  const handleSaveName = async () => {
    const updateUserResult = await updateUser(nameInputValue);

    if (updateUserResult.isFailure()) {
      toast.error('保存に失敗しました');
      return;
    }

    toast.success('更新しました');
    setIsEditName(false);
  };

  return { isEditName, edit, handleSaveName, nameInputValue, setNameInputValue };
};

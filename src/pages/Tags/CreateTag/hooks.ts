import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAsyncFn } from 'react-use';

import { postTag as postTagApi } from '~/requests/tag';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, open, close };
};

export const useField = () => {
  const [name, setName] = useState('');
  return { name, setName };
};

export const useCreateTag = (refresh: () => void) => {
  const [state, postTag] = useAsyncFn(postTagApi);

  const handleSave = async (name: string, close: () => void) => {
    const createTeamResult = await postTag(name);

    if (createTeamResult.isFailure()) {
      toast.error('タグの作成に失敗しました');
      return;
    }

    toast.success('タグを作成しました');
    close();
    refresh();
  };

  return { creating: state.loading, handleSave };
};

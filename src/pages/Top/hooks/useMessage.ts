import { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { parseMessage } from '~/domains/praise';
import { postPraise } from '~/requests/praise';
import { searchUser } from '~/requests/user';

export const useMessage = (refetchTimeline: () => void) => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const clearMessage = useCallback(() => {
    setMessage('');

    if (ref.current) {
      ref.current.value = '';
    }
  }, []);

  const handleClickSend = async () => {
    const { to, body, tags } = parseMessage(message);

    const searchUsersResult = await searchUser({ word: to });

    if (searchUsersResult.isFailure() || searchUsersResult.value.length === 0) {
      // TODO: show notification
      toast.error('送信に失敗しました');
      return;
    }

    // TODO: show select dialog
    const user = searchUsersResult.value[0];

    setSending(true);

    postPraise(user.id, body, tags).then((result) => {
      setSending(false);

      if (result.isSuccess()) {
        toast.success('送信しました');
        clearMessage();
        refetchTimeline();
      } else {
        toast.error('送信に失敗しました');
      }
    });
  };

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (ref.current === document.activeElement) {
        event.stopPropagation();

        if (event.metaKey && event.key === 'Enter') {
          handleClickSend();
        }
      }
    },
    [ref.current, message],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return { ref, sending, handleChangeMessage: setMessage, handleClickSend };
};

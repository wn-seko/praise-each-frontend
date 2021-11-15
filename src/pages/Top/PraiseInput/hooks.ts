import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { parseMessage } from '~/domains/praise';
import { Tag } from '~/domains/tag';
import { User } from '~/domains/user';
import { postPraise } from '~/requests/praise';
import { searchTags } from '~/requests/tag';
import { searchUser } from '~/requests/user';

export const useMessage = (refetchTimeline: () => void) => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const handleChangeMessage = (message: string) => {
    setMessage(message);
  };

  const clearMessage = () => {
    if (ref.current) {
      const input = ref.current.querySelector('input') as HTMLInputElement;
      input.value = '';
    }
  };

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

  return { ref, sending, handleChangeMessage, handleClickSend };
};

export const useAddress = () => {
  const [inputChar, setInputChar] = useState('');
  const [userListCache, setUserListCache] = useState<Record<string, User[]>>({});

  const handleChangeWord = (word: string) => {
    const firstCharMatched = word.match(/^@(.)/);

    if (firstCharMatched) {
      const char = firstCharMatched[1];
      setInputChar(char);

      if (!userListCache[char]) {
        // 読込中に再読み込みしないようキャッシュ
        setUserListCache((prev) => ({ ...prev, [char]: [] }));

        // 候補リストを取得
        searchUser({ word: char }).then((result) => {
          if (result.isSuccess()) {
            setUserListCache((prev) => ({ ...prev, [char]: result.value }));
          } else {
            // 失敗した場合はキャッシュを削除する
            const { [char]: _, ...rest } = userListCache;
            setUserListCache(rest);
          }
        });
      }
    }
  };

  const addressList = (userListCache[inputChar] || []).map((user) => ({
    key: user.id,
    value: user.id,
    text: '@' + user.name,
    icon: user.icon,
  }));

  return { addressList, handleChangeWord };
};

export const useTag = () => {
  const [inputChar, setInputChar] = useState('');
  const [tagListCache, setTagListCache] = useState<Record<string, Tag[]>>({});

  const handleChangeWord = (word: string) => {
    const firstCharMatched = word.match(/^#(.)/);

    if (firstCharMatched) {
      const char = firstCharMatched[1];
      setInputChar(char);

      if (!tagListCache[char]) {
        // 読込中に再読み込みしないようキャッシュ
        setTagListCache((prev) => ({ ...prev, [char]: [] }));

        // 候補リストを取得
        searchTags(char, 1, 5).then((result) => {
          if (result.isSuccess()) {
            const { list } = result.value;
            setTagListCache((prev) => ({ ...prev, [char]: list }));
          } else {
            // 失敗した場合はキャッシュを削除する
            const { [char]: _, ...rest } = tagListCache;
            setTagListCache(rest);
          }
        });
      }
    }
  };

  const tagList = (tagListCache[inputChar] || []).map((tag) => ({
    key: tag.id,
    value: tag.id,
    text: '#' + tag.name,
  }));

  return { tagList, handleChangeWord };
};

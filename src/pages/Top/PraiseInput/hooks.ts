import { useState } from 'react';
import { parseMessage } from '~/domains/praise';
import { User } from '~/domains/user';
import { postPraise } from '~/requests/praise';
import { searchUser } from '~/requests/user';

export const useMessage = () => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleChangeMessage = (message: string) => {
    setMessage(message);
  };

  const handleClickSend = async () => {
    const { to, body, tags } = parseMessage(message);
    const searchUsersResult = await searchUser(to);

    if (searchUsersResult.isFailure() || searchUsersResult.value.length === 0) {
      // TODO: show notification
      return;
    }

    // TODO: show select dialog
    const user = searchUsersResult.value[0];

    setSending(true);
    await postPraise(user.id, body, tags);
    setSending(false);
  };

  return { sending, handleChangeMessage, handleClickSend };
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
        searchUser(char).then((result) => {
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

export const useHashtag = () => {
  const hashtagList = ['test1', 'test2', 'test3'].map((item) => ({
    key: item,
    value: item,
    text: '#' + item,
  }));
  return { hashtagList };
};

import { useState } from 'react';
import { User } from '~/domains/user';
import { searchUser } from '~/requests/user';

export const useUserList = (selected: User[]) => {
  const [input, setInput] = useState('');
  const [userListCache, setUserListCache] = useState<Record<string, User[]>>({});

  const handleChangeWord = (text: string) => {
    setInput(text);

    if (!text) {
      return;
    }

    const char = text[0];

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
  };

  const userList = userListCache[input[0]] || [];
  const filteredUserList = userList
    .filter((user) => !selected.map((user) => user.id).includes(user.id))
    .filter((user) => new RegExp(input, 'i').test(user.name));

  return { userList: filteredUserList, handleChangeWord };
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import { Tag } from '~/domains/tag';
import { User } from '~/domains/user';
import { searchTags } from '~/requests/tag';
import { searchUser } from '~/requests/user';

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

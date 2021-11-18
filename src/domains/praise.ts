import { Dayjs } from 'dayjs';
import { User } from './user';

export interface Praise {
  id: string;
  from: User;
  to: User;
  message: string;
  tags: string[];
  upVotes: User[];
  likes: User[];
  stamps: Stamp[];
  createdAt: Dayjs;
  updatedAt: Dayjs;
}

export interface Stamp {
  stampId: string;
  users: User[];
}

const uniq = (list: string[]) =>
  list.reduce(
    (memo, item) => (memo.find((memoItem) => memoItem === item) ? memo : memo.concat([item])),
    [] as string[],
  );

export const extractTags = (text: string) => {
  const words = text.split(' ');
  return uniq(words.filter((word) => word.startsWith('#')));
};

export const parseMessage = (text: string) => {
  const words = text.split(' ');

  const [to, bodyWords] = /@.+/.test(words[0]) ? [words[0].replace(/^@/, ''), words.slice(1)] : ['', words];

  const body = bodyWords.join(' ');

  const parsed: { type: 'tag' | 'text'; text: string }[] = bodyWords.map((word) =>
    /^#.+/.test(word) ? { type: 'tag', text: word } : { type: 'text', text: word },
  );

  const tags = uniq(parsed.filter((word) => word.type === 'tag').map((word) => word.text));

  return { to, body, parsed, tags };
};

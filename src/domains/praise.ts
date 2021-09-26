import { Dayjs } from 'dayjs';
import { User } from './user';

export interface Praise {
  from: User;
  to: User;
  message: string;
  tags: string[];
  createdAt: Dayjs;
}

const uniq = (list: string[]) =>
  list.reduce(
    (memo, item) => (memo.find((memoItem) => memoItem === item) ? memo : memo.concat([item])),
    [] as string[],
  );

export const parseMessage = (text: string) => {
  const words = text.split(' ');

  const [to, bodyWords] = /@.+/.test(words[0]) ? [words[0].replace(/^@/, ''), words.slice(1)] : ['', words];

  const body = bodyWords.join(' ');

  const parsed: { type: 'tag' | 'text'; text: string }[] = bodyWords.map((word) =>
    /#.+/.test(word) ? { type: 'tag', text: word } : { type: 'text', text: word },
  );

  const tags = uniq(parsed.filter((word) => word.type === 'tag').map((word) => word.text));

  return { to, body, parsed, tags };
};

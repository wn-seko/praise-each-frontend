import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { InputOnChangeData } from 'semantic-ui-react';

interface DropdownItem {
  key: string;
  value: string;
  text: string;
  icon?: string;
}

const diffInput = (prev = '', current: string) => {
  const prevValues = prev.split(' ');
  const currentValues = current.split(' ');

  if (Math.abs(prevValues.length - currentValues.length) >= 2) {
    return '';
  }

  return currentValues.find((input, index) => input !== prevValues[index]) || '';
};

const replaceInput = (prev = '', current: string, word: string) => {
  const prevValues = prev.split(' ');
  const currentValues = current.split(' ');
  const index = currentValues.findIndex((input, index) => input !== prevValues[index]);
  currentValues.splice(index, 1, word);
  return currentValues.join(' ');
};

const filterItems = (inputText: string, list: DropdownItem[]) =>
  list.filter((item) => new RegExp(inputText, 'i').test(item.text));

export const useDropdownInput = (
  addressList: DropdownItem[],
  hashtagList: DropdownItem[],
  onChange?: (text: string) => void,
  onChangeWord?: (word: string) => void,
  defaultRef?: React.RefObject<HTMLElement>,
) => {
  const [input, setInput] = useState({ prev: '', current: '' });
  const [inputWord, setInputWord] = useState('');
  const [dropdown, setDropdown] = useState<DropdownItem[]>([]);

  const handleChangeInput = (_: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setInput({ prev: input.current, current: data.value });
  };

  const ref = defaultRef || useRef<HTMLDivElement>(null);

  const handleSelectedWord = (item: DropdownItem) => {
    if (ref.current) {
      const inputElement = ref.current.querySelector('input');
      if (inputElement) {
        const newText = replaceInput(input.prev, input.current, item.text);
        inputElement.value = newText + ' ';
        inputElement.focus();
        setInput({ prev: newText, current: newText + ' ' });
      }
    }
    setDropdown([]);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    void event;
    // console.log(event.metaKey, event.key);
  };

  useEffect(() => {
    const word = diffInput(input.prev, input.current);

    setInputWord(word);

    if (/^@.+/.test(word)) {
      setDropdown(filterItems(word, addressList));
    } else if (/^#.+/.test(word)) {
      setDropdown(filterItems(word, hashtagList));
    } else {
      setDropdown([]);
    }

    if (onChange) {
      onChange(input.current);
    }
  }, [input, addressList, hashtagList]);

  useEffect(() => {
    if (onChangeWord) {
      onChangeWord(inputWord);
    }
  }, [inputWord]);

  return { ref, dropdown, handleChangeInput, handleSelectedWord, handleKeyPress };
};

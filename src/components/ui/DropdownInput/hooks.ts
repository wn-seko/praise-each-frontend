import React, { useState, useRef, useEffect, useCallback } from 'react';

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
  defaultInput: string,
  addressList: DropdownItem[],
  hashtagList: DropdownItem[],
  onChange?: (text: string) => void,
  onChangeWord?: (word: string) => void,
  defaultRef?: React.RefObject<HTMLInputElement>,
) => {
  const [input, setInput] = useState({ prev: defaultInput, current: defaultInput });
  const [inputWord, setInputWord] = useState('');
  const [dropdown, setDropdown] = useState<DropdownItem[]>([]);
  const [activeDocument, setActiveDocument] = useState<Element | null>(null);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ prev: input.current, current: event.currentTarget.value });
  };

  const ref = defaultRef || useRef<HTMLInputElement>(null);
  const inputElement = ref.current ?? null;
  const active = inputElement === activeDocument;

  const handleSelectedWord = (item: DropdownItem) => {
    if (inputElement) {
      const newText = replaceInput(input.prev, input.current, item.text);
      inputElement.value = newText + ' ';
      inputElement.focus();
      setInput({ prev: newText, current: newText + ' ' });
    }
    setDropdown([]);
  };

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (dropdown.length > 0 && inputElement && ['ArrowUp', 'ArrowDown'].includes(event.key)) {
        inputElement.blur();
      }
    },
    [inputElement, dropdown.length],
  );

  const handleFocus = useCallback(() => {
    setActiveDocument(document.activeElement);
  }, [ref.current]);

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

  useEffect(() => {
    if (ref.current) {
      ref.current.value = defaultInput;
    }
  }, [defaultInput, ref.current]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, [inputElement, document.activeElement]);

  return { ref, active, dropdown, handleChangeInput, handleSelectedWord };
};

import { useState, useEffect } from 'react';

interface Option {
  key: string;
  value: string;
  text: string;
  icon?: string;
}

const convertOption = (option: Option | string, index: number) =>
  typeof option === 'string' ? { key: String(index), value: option, text: option } : option;

export const useDropdown = (active: boolean, options: (string | Option)[], onSelected?: (option: Option) => void) => {
  const [selected, setSelected] = useState(-1);
  const sanitizedOptions = options.map(convertOption);

  const createHandleMouseEnter = (index: number) => () => {
    setSelected(index);
  };

  const createHandleMouseLeave = (index: number) => () => {
    setSelected(index);
  };

  const handleClick = (option: Option) => () => {
    if (onSelected) {
      onSelected(option);
    }
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      event.stopPropagation();

      if (!active) {
        return true;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelected((prev) => Math.min(prev + 1, sanitizedOptions.length - 1));
        return false;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelected((prev) => Math.max(prev - 1, 0));
        return false;
      }
      if (event.key === 'Enter' && onSelected) {
        event.preventDefault();
        onSelected(sanitizedOptions[selected]);
        return false;
      }

      return true;
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [selected]);

  return { selected, options: sanitizedOptions, createHandleMouseEnter, createHandleMouseLeave, handleClick };
};

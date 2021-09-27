import { useState, useEffect } from 'react';

interface Option {
  key: string;
  value: string;
  text: string;
  icon?: string;
}

const convertOption = (option: Option | string, index: number) =>
  typeof option === 'string' ? { key: String(index), value: option, text: option } : option;

export const useDropdown = (options: (string | Option)[], onSelected?: (option: Option) => void) => {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(-1);
  const sanitizedOptions = options.map(convertOption);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleClick = (option: Option) => () => {
    if (onSelected) {
      onSelected(option);
    }
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      event.stopPropagation();

      if (event.key === 'ArrowDown') {
        setSelected((prev) => Math.min(prev + 1, sanitizedOptions.length - 1));
      }
      if (event.key === 'ArrowUp') {
        setSelected((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === 'Enter' && onSelected) {
        onSelected(sanitizedOptions[selected]);
      }
    };

    document.onkeydown = handleKeydown;

    return () => {
      document.onkeydown = null;
    };
  }, [selected]);

  return { selected, options: sanitizedOptions, hover, handleMouseEnter, handleMouseLeave, handleClick };
};

import { useCallback, useEffect, useRef } from 'react';

export const useEmojiPicker = (close: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback((e: MouseEvent) => {
    e.stopPropagation();

    if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
      close();
      document.removeEventListener('click', onClickOutside);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  return { ref };
};

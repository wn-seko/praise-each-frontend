import { useCallback, useState } from 'react';

import { TeamSlackWebhook } from '~/domains/slackWebhook';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, open, close };
};

export const useField = (webhook?: TeamSlackWebhook) => {
  const [url, setUrl] = useState(webhook?.url || '');
  const [name, setName] = useState(webhook?.name || '');
  const [description, setDescription] = useState(webhook?.description || '');
  return { url, name, description, setUrl, setName, setDescription };
};

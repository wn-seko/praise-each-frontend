import { useState } from 'react';
import { toast } from 'react-toastify';

import { extractTags, Praise } from '~/domains/praise';
import { putPraise } from '~/requests/praise';

export const useField = (
  praiseId: string,
  defaultMessage: string,
  onUpdate: (praise: Praise) => void,
  close: () => void,
) => {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(defaultMessage);

  const handleSave = async () => {
    const tags = extractTags(message);

    setSaving(true);

    const result = await putPraise(praiseId, message, tags);
    setSaving(false);

    if (result.isSuccess()) {
      toast.success('送信しました');
      onUpdate(result.value);
      close();
      return true;
    } else {
      toast.error('送信に失敗しました');
      return false;
    }
  };

  return { saving, message, setMessage, handleSave };
};

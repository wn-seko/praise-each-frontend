import React, { forwardRef } from 'react';
import DropdownInput from '~/components/ui/DropdownInput';
import { useAddress, useTag } from './hooks';

interface PraiseInputProps {
  ref?: React.Ref<HTMLInputElement>;
  defaultMessage?: string;
  handleChangeMessage: (message: string) => void;
}

const PraiseInput = forwardRef<HTMLElement, PraiseInputProps>(function PraiseInputInner(
  { defaultMessage, handleChangeMessage },
  ref,
) {
  const { addressList, handleChangeWord: handleInputAddress } = useAddress();
  const { tagList, handleChangeWord: handleInputTag } = useTag();
  const handleChangeWord = (word: string) => {
    handleInputAddress(word);
    handleInputTag(word);
  };

  return (
    <DropdownInput
      ref={ref}
      defaultInput={defaultMessage}
      placeholder="@感謝を伝えたい人  感謝の気持ちを伝えましょう！ #ハッシュタグ１ #ハッシュタグ２..."
      addressList={addressList}
      hashtagList={tagList}
      onChange={handleChangeMessage}
      onChangeWord={handleChangeWord}
    />
  );
});

export default PraiseInput;

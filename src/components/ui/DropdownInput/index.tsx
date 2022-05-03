import { Input } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

import Dropdown from '~/components/ui/Dropdown';

import { useDropdownInput } from './hooks';

interface DropdownItem {
  key: string;
  value: string;
  text: string;
  icon?: string;
}

interface DropdownInputProps {
  defaultInput?: string;
  placeholder?: string;
  addressList?: DropdownItem[];
  hashtagList?: DropdownItem[];
  onChange?: (text: string) => void;
  onChangeWord?: (word: string) => void;
}

const DropdownInput = forwardRef<HTMLInputElement, DropdownInputProps>(function DropdownItemInner(
  { defaultInput = '', placeholder = '', addressList = [], hashtagList = [], onChange, onChangeWord },
  ref,
) {
  const {
    ref: altRef,
    active,
    dropdown,
    handleChangeInput,
    handleSelectedWord,
  } = useDropdownInput(
    defaultInput,
    addressList,
    hashtagList,
    onChange,
    onChangeWord,
    ref as React.RefObject<HTMLInputElement>,
  );

  return (
    <>
      <Input ref={altRef} placeholder={placeholder} onChange={handleChangeInput} />
      {dropdown.length > 0 && <Dropdown active={active} options={dropdown} onSelected={handleSelectedWord} />}
    </>
  );
});

export default DropdownInput;

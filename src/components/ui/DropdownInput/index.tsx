import React, { forwardRef } from 'react';
import { Input, Ref } from 'semantic-ui-react';
import Dropdown from '~/components/ui/Dropdown';
import { useDropdownInput } from './hooks';

interface DropdownItem {
  key: string;
  value: string;
  text: string;
  icon?: string;
}

interface DropdownInputProps {
  placeholder?: string;
  addressList?: DropdownItem[];
  hashtagList?: DropdownItem[];
  onChange?: (text: string) => void;
  onChangeWord?: (word: string) => void;
}

const DropdownInput = forwardRef<HTMLElement, DropdownInputProps>(function DropdownItemInner(
  { placeholder = '', addressList = [], hashtagList = [], onChange, onChangeWord },
  outerRef,
) {
  const { ref, dropdown, handleChangeInput, handleSelectedWord, handleKeyPress } = useDropdownInput(
    addressList,
    hashtagList,
    onChange,
    onChangeWord,
    outerRef as React.RefObject<HTMLElement>,
  );

  return (
    <>
      <Ref innerRef={ref}>
        <Input fluid={true} placeholder={placeholder} onChange={handleChangeInput} onKeyPress={handleKeyPress} />
      </Ref>
      {dropdown.length > 0 && <Dropdown options={dropdown} onSelected={handleSelectedWord} />}
    </>
  );
});

export default DropdownInput;

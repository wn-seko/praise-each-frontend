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
  defaultInput?: string;
  placeholder?: string;
  addressList?: DropdownItem[];
  hashtagList?: DropdownItem[];
  onChange?: (text: string) => void;
  onChangeWord?: (word: string) => void;
}

const DropdownInput = forwardRef<HTMLElement, DropdownInputProps>(function DropdownItemInner(
  { defaultInput = '', placeholder = '', addressList = [], hashtagList = [], onChange, onChangeWord },
  outerRef,
) {
  const { ref, active, dropdown, handleChangeInput, handleSelectedWord } = useDropdownInput(
    defaultInput,
    addressList,
    hashtagList,
    onChange,
    onChangeWord,
    outerRef as React.RefObject<HTMLElement>,
  );

  return (
    <>
      <Ref innerRef={ref}>
        <Input fluid={true} placeholder={placeholder} onChange={handleChangeInput} />
      </Ref>
      {dropdown.length > 0 && <Dropdown active={active} options={dropdown} onSelected={handleSelectedWord} />}
    </>
  );
});

export default DropdownInput;

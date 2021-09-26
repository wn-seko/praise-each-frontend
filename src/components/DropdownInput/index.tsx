import React, { FC } from 'react';
import { Input, Ref } from 'semantic-ui-react';
import Dropdown from '~/components/Dropdown';
import { useDropdownInput } from './hooks';

interface DropdownItem {
  key: string;
  value: string;
  text: string;
  icon?: string;
}

interface DropdownInputProps {
  addressList?: DropdownItem[];
  hashtagList?: DropdownItem[];
  onChange?: (text: string) => void;
  onChangeWord?: (word: string) => void;
}

const DropdownInput: FC<DropdownInputProps> = ({ addressList = [], hashtagList = [], onChange, onChangeWord }) => {
  const { ref, dropdown, handleChangeInput, handleSelectedWord, handleKeyPress } = useDropdownInput(
    addressList,
    hashtagList,
    onChange,
    onChangeWord,
  );

  return (
    <>
      <Ref innerRef={ref}>
        <Input fluid={true} onChange={handleChangeInput} onKeyPress={handleKeyPress} />
      </Ref>
      {dropdown.length > 0 && <Dropdown options={dropdown} onSelected={handleSelectedWord} />}
    </>
  );
};

export default DropdownInput;

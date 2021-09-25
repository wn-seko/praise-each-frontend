import React, { FC } from 'react';
import { Input, Ref } from 'semantic-ui-react';
import Dropdown from '~/components/Dropdown';
import { useDropdownInput } from './hooks';

interface DropdownInputProps {
  onChange?: (text: string) => void;
}

const DropdownInput: FC<DropdownInputProps> = ({ onChange }) => {
  const { ref, dropdown, handleChangeInput, handleSelectedWord, handleKeyPress } = useDropdownInput(onChange);

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

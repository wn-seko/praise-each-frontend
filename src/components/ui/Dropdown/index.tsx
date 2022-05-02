import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useDropdown } from './hooks';
import { Avatar, Box, Flex } from '@chakra-ui/react';

const Item = styled.div`
  background: #fff;
  border: solid 1px rgba(34, 36, 38, 0.15);
  padding: 0.5rem;

  &[data-selected='true'] {
    background: rgba(34, 36, 38, 0.07);
  }
`;

interface Option {
  key: string;
  value: string;
  text: string;
  icon?: string;
}

interface DropdownProps {
  active: boolean;
  options: (string | Option)[];
  onSelected?: (option: Option) => void;
}

const Dropdown: FC<DropdownProps> = ({ active, options: optionsProps, onSelected }) => {
  const { selected, options, handleClick, createHandleMouseEnter, createHandleMouseLeave } = useDropdown(
    active,
    optionsProps,
    onSelected,
  );

  if (!active) {
    return null;
  }

  return (
    <Box width="100%" borderRadius={4}>
      {options.map((option, index) => (
        <Item
          key={option.key}
          data-selected={index === selected}
          onClick={handleClick(option)}
          onMouseEnter={createHandleMouseEnter(index)}
          onMouseLeave={createHandleMouseLeave(index)}
        >
          <Flex gap={2}>
            {option.icon && <Avatar src={option.icon} size="xs" />}
            <span>{option.text}</span>
          </Flex>
        </Item>
      ))}
    </Box>
  );
};

export default Dropdown;

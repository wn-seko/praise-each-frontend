import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Avatar, Box, Flex } from '@chakra-ui/react';
import { useDropdown } from './hooks';
import { getThemeColor } from '~/layouts/theme';
import { getChakraColorVariableName } from '~/utils/chakra';

interface ItemProps {
  borderColor: string;
}

const Item = styled.div<ItemProps>`
  border: solid 1px var(${(props) => props.borderColor});
  padding: 0.5rem;
  cursor: pointer;

  &[data-selected='true'] {
    background: var(${(props) => props.borderColor});
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
          borderColor={getChakraColorVariableName(getThemeColor('border'))}
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

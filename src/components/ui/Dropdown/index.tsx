import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useDropdown } from './hooks';
import Avatar from '~/components/ui/Avatar';

const Container = styled.div`
  width: 100%;
  border-radius: 4px;
`;

const Item = styled.div`
  background: #fff;
  border: solid 1px rgba(34, 36, 38, 0.15);
  padding: 0.5rem;

  &[data-selected='true'] {
    background: rgba(34, 36, 38, 0.07);
  }
`;

const Layout = styled.div`
  > * {
    margin-right: 0.5em !important;
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
    <Container>
      {options.map((option, index) => (
        <Item
          key={option.key}
          data-selected={index === selected}
          onClick={handleClick(option)}
          onMouseEnter={createHandleMouseEnter(index)}
          onMouseLeave={createHandleMouseLeave(index)}
        >
          <Layout>
            {option.icon && <Avatar src={option.icon} size="tiny" />}
            <span>{option.text}</span>
          </Layout>
        </Item>
      ))}
    </Container>
  );
};

export default Dropdown;

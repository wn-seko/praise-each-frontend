import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useDropdown } from './hooks'

const Container = styled.div`
  width: 100%;
  border-radius: 4px;
`

const Item = styled.div`
  background: #fff;
  border: solid 1px rgba(34, 36, 38, 0.15);
  padding: 0.5rem;

  &[data-selected='true'] {
    background: rgba(34, 36, 38, 0.07);
  }

  &:hover {
    background: rgba(34, 36, 38, 0.07);
  }
`

interface Option {
  key: string
  value: string
  text: string
}

interface DropdownProps {
  options: (string | Option)[]
  onSelected?: (value: string) => void
}

const Dropdown: FC<DropdownProps> = ({ options: optionsProps, onSelected }) => {
  const { selected, options, hover, handleMouseEnter, handleMouseLeave, handleClick } = useDropdown(
    optionsProps,
    onSelected,
  )

  return (
    <Container>
      {options.map((option, index) => (
        <Item
          key={option.key}
          data-selected={!hover && index === selected}
          onClick={handleClick(option.value)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {option.text}
        </Item>
      ))}
    </Container>
  )
}

export default Dropdown

import styled from '@emotion/styled';
import React, { FC } from 'react';

interface StyledBoxProps {
  size: number;
  color: string;
}

const StyledBox = styled.div<StyledBoxProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border: 1px solid #888;
  opacity: 1;
`;

interface BoxProps {
  size: number;
  color: string;
}

const Box: FC<BoxProps> = ({ color, size }) => <StyledBox size={size} color={color} />;

export default Box;

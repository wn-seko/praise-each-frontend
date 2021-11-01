import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Label, LabelProps } from 'semantic-ui-react';

type ColoredLabelProps =
  | Omit<LabelProps, 'color'>
  | {
      color?: string;
    };

const getTextColor = (color: string) => {
  const r = Number.parseInt(color.slice(1, 3), 16);
  const g = Number.parseInt(color.slice(3, 5), 16);
  const b = Number.parseInt(color.slice(5, 7), 16);
  return (r + g + b) / 3 > 128 ? '#444' : '#eee';
};

export const StyledLabel = styled(Label)`
  background-color: ${(props: ColoredLabelProps) => props.color} !important;
  color: ${(props: ColoredLabelProps) => getTextColor(props.color)} !important;
`;

export const ColoredLabel: FC<ColoredLabelProps> = ({ color, ...rest }) => {
  return <StyledLabel color={color} {...rest} />;
};

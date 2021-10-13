import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Label, LabelProps } from 'semantic-ui-react';

type ColoredLabelProps =
  | Omit<LabelProps, 'color'>
  | {
      color?: string;
    };

export const StyledLabel = styled(Label)`
  background-color: ${(props: ColoredLabelProps) => props.color} !important;
  color: #fff !important;
`;

export const ColoredLabel: FC<ColoredLabelProps> = ({ color, ...rest }) => {
  return <StyledLabel color={color} {...rest} />;
};

import React, { FC } from 'react';
import { LabelProps } from 'semantic-ui-react';
import { Tag, TagLabel } from '@chakra-ui/react';

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

export const ColoredLabel: FC<ColoredLabelProps> = ({ color, children, ...rest }) => (
  <Tag variant="solid" size="sm" backgroundColor={color} color={getTextColor(color)} {...rest}>
    <TagLabel fontWeight="bold">{children}</TagLabel>
  </Tag>
);

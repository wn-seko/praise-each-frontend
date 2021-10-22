import styled from '@emotion/styled';
import React, { FC } from 'react';
import { TwitterPicker, TwitterPickerProps } from 'react-color';

const StyledContainer = styled.div`
  > div > div:nth-child(1),
  > div > div:nth-child(2) {
    display: none;
  }

  input {
    height: 11px !important;
  }
`;

const ColorPicker: FC<TwitterPickerProps> = (props) => {
  const defaultColors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ];

  return (
    <StyledContainer>
      <TwitterPicker colors={defaultColors} {...props} />
    </StyledContainer>
  );
};

export default ColorPicker;

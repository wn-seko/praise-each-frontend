import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Picker, EmojiData } from 'emoji-mart';
import React, { FC } from 'react';
import { FaRegSmile } from 'react-icons/fa';

import { useModal } from '~/hooks/useModal';

import { useEmojiPicker } from './hooks';

interface PickerContainerProps {
  close: () => void;
  onClick?: (name: string) => void;
}

const Container = styled.a`
  align-items: center;
  line-height: 1;
  cursor: pointer;

  > i {
    margin: 0 !important;
  }
`;

const PickerContainer: FC<PickerContainerProps> = ({ close, onClick }) => {
  const { ref } = useEmojiPicker(close);
  const handleClick = (emoji: EmojiData) => {
    if (onClick && emoji.id) {
      onClick(emoji.id);
      close();
    }
  };

  return (
    <Box ref={ref} zIndex={100}>
      <Picker sheetSize={16} onClick={handleClick} style={{ position: 'absolute', zIndex: 1000 }} />
    </Box>
  );
};

interface EmojiPickerProps {
  onClick?: (name: string) => void;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ onClick }) => {
  const { isOpen, close, toggle } = useModal();

  return (
    <>
      <Container>
        <FaRegSmile size={18} onClick={toggle} />
      </Container>
      {isOpen && <PickerContainer close={close} onClick={onClick} />}
    </>
  );
};

export default EmojiPicker;

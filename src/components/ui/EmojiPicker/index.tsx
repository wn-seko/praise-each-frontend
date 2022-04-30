import React, { FC } from 'react';
import { Picker, EmojiData } from 'emoji-mart';
import { useModal } from '~/hooks/useModal';
import { useEmojiPicker } from './hooks';
import styled from '@emotion/styled';
import { MdOutlineAddReaction } from 'react-icons/md';
import { Box } from '@chakra-ui/react';

interface PickerContainerProps {
  close: () => void;
  onClick?: (name: string) => void;
}

const Container = styled.a`
  align-items: center;
  line-height: 1;
  color: rgba(0, 0, 0, 0.4) !important;
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
        <MdOutlineAddReaction size={18} onClick={toggle} />
      </Container>
      {isOpen && <PickerContainer close={close} onClick={onClick} />}
    </>
  );
};

export default EmojiPicker;

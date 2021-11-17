import React, { FC } from 'react';
import { Picker, EmojiData } from 'emoji-mart';
import { useModal } from '~/hooks/useModal';
import { useEmojiPicker } from './hooks';
import styled from '@emotion/styled';
import { Icon } from 'semantic-ui-react';

interface PickerContainerProps {
  close: () => void;
  onClick?: (name: string) => void;
}

const Container = styled.a`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.4) !important;

  > i {
    margin: 0 !important;
  }
`;

const ResizedIcon = styled(Icon)`
  font-size: 16px !important;
  height: 16px !important;
  width: 16px !important;
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
    <div ref={ref}>
      <Picker sheetSize={16} onClick={handleClick} style={{ position: 'absolute', zIndex: 1000 }} />
    </div>
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
        <ResizedIcon name="plus" onClick={toggle} />
      </Container>
      {isOpen && <PickerContainer close={close} onClick={onClick} />}
    </>
  );
};

export default EmojiPicker;

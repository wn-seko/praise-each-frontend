import React, { FC } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import DropdownInput from '~/components/ui/DropdownInput';
import { useAddress, useTag, useMessage } from './hooks';

interface PraiseInputProps {
  refetchTimeline: () => void;
}

const PraiseInput: FC<PraiseInputProps> = ({ refetchTimeline }) => {
  const { ref, sending, handleChangeMessage, handleClickSend } = useMessage(refetchTimeline);
  const { addressList, handleChangeWord: handleInputAddress } = useAddress();
  const { tagList, handleChangeWord: handleInputTag } = useTag();
  const handleChangeWord = (word: string) => {
    handleInputAddress(word);
    handleInputTag(word);
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={14}>
          <DropdownInput
            ref={ref}
            placeholder="@感謝を伝えたい人  感謝の気持ちを伝えましょう！ #ハッシュタグ１ #ハッシュタグ２..."
            addressList={addressList}
            hashtagList={tagList}
            onChange={handleChangeMessage}
            onChangeWord={handleChangeWord}
          />
        </Grid.Column>
        <Grid.Column width={2}>
          <Button fluid={true} primary={true} disabled={sending} loading={sending} onClick={handleClickSend}>
            送信
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PraiseInput;

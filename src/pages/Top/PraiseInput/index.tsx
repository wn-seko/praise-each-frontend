import React, { FC } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import DropdownInput from '~/components/ui/DropdownInput';
import { useAddress, useHashtag, useMessage } from './hooks';

const PraiseInput: FC = () => {
  const { sending, handleChangeMessage, handleClickSend } = useMessage();
  const { addressList, handleChangeWord } = useAddress();
  const { hashtagList } = useHashtag();

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={14}>
          <DropdownInput
            addressList={addressList}
            hashtagList={hashtagList}
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

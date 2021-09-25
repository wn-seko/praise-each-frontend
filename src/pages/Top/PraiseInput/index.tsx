import React, { FC } from 'react'
import { useState } from 'react'
import { Button, Grid } from 'semantic-ui-react'
import DropdownInput from '~/components/DropdownInput'
import { parseMessage } from '~/domains/praise'
import { postPraise } from '~/requests/praise'

const PraiseInput: FC = () => {
  const [message, setMessage] = useState('')

  const handleChangeMessage = (message: string) => {
    setMessage(message)
  }

  const handleClickSend = () => {
    const { to, body, tags } = parseMessage(message)
    postPraise(to, body, tags)
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={14}>
          <DropdownInput onChange={handleChangeMessage} />
        </Grid.Column>
        <Grid.Column width={2}>
          <Button fluid={true} primary={true} onClick={handleClickSend}>
            送信
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default PraiseInput

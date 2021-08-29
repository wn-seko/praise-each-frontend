import React, { FC } from 'react'
import { Card } from 'semantic-ui-react'
import { parseMessage } from '~/domains/praise'

interface PraiseCardProps {
  from: string
  to: string
  createdAt: string
  message: string
}

const PraiseCard: FC<PraiseCardProps> = ({ from, to, createdAt, message }) => {
  const parsedMessage = parseMessage(message).parsed

  return (
    <Card fluid={true}>
      <Card.Content>
        <Card.Header>
          {from} → {to}
        </Card.Header>
        <Card.Meta>{createdAt}</Card.Meta>
        <Card.Description>
          {parsedMessage.map((word) => (word.type === 'tag' ? <a>{word.text}</a> : word.text))}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default PraiseCard

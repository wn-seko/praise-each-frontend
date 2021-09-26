import React, { FC } from 'react';
import { Card } from 'semantic-ui-react';
import { parseMessage } from '~/domains/praise';
import { User } from '~/domains/user';

interface PraiseCardProps {
  from: User;
  to: User;
  createdAt: string;
  message: string;
}

const PraiseCard: FC<PraiseCardProps> = ({ from, to, createdAt, message }) => {
  const parsedMessage = parseMessage(message).parsed;

  return (
    <Card fluid={true}>
      <Card.Content>
        <Card.Header>
          {from.name} → {to.name}
        </Card.Header>
        <Card.Meta>{createdAt}</Card.Meta>
        <Card.Description>
          {parsedMessage.map((word) => (word.type === 'tag' ? <a>{word.text}</a> : word.text))}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default PraiseCard;

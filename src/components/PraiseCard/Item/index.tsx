import React, { FC } from 'react';
import { Card } from 'semantic-ui-react';
import { parseMessage } from '~/domains/praise';
import { User } from '~/domains/user';
import Avatar from '~/components/Avatar';
import styled from '@emotion/styled';

interface PraiseCardProps {
  from: User;
  to: User;
  createdAt: string;
  message: string;
}

const CardHeader = styled(Card.Header)`
  display: inline-flex !important;
`;

const NameLabel = styled.span`
  margin: 0 4px;
  vertical-align: middle;
`;

const ArrowLabel = styled.span`
  vertical-align: middle;
`;

const TagBlock = styled.div`
  margin-right: 12px;
`;

const PraiseCard: FC<PraiseCardProps> = ({ from, to, createdAt, message }) => {
  const parsedMessage = parseMessage(message).parsed;

  return (
    <Card fluid={true}>
      <Card.Content>
        <CardHeader>
          <TagBlock>
            <Avatar src={from.icon} size="mini" />
            <NameLabel>{from.name}</NameLabel>
          </TagBlock>
          <TagBlock>
            <ArrowLabel> → </ArrowLabel>
          </TagBlock>
          <TagBlock>
            <Avatar src={to.icon} size="mini" />
            <NameLabel>{to.name}</NameLabel>
          </TagBlock>
        </CardHeader>
        <Card.Meta>{createdAt}</Card.Meta>
        <Card.Description>
          {parsedMessage.map((word) => (word.type === 'tag' ? <a>{word.text}</a> : word.text))}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default PraiseCard;

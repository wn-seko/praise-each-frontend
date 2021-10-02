import React, { FC } from 'react';
import { Card } from 'semantic-ui-react';
import { parseMessage, Praise } from '~/domains/praise';
import Avatar from '~/components/ui/Avatar';
import styled from '@emotion/styled';
import Reaction from '~/components/ui/Reaction';

interface PraiseCardProps extends Omit<Praise, 'createdAt'> {
  upVoted: boolean;
  liked: boolean;
  isMine: boolean;
  onClickUpVote?: () => void;
  onClickLike: () => void;
  createdAt: string;
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

const ReactionBlock = styled.div`
  > * {
    margin-right: 1em;
  }
`;

const PraiseCard: FC<PraiseCardProps> = ({
  from,
  to,
  message,
  createdAt,
  upVotes,
  likes,
  upVoted,
  liked,
  isMine,
  onClickLike,
  onClickUpVote,
}) => {
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
      <Card.Content extra={true}>
        <ReactionBlock>
          <Reaction
            title="賛同"
            theme="blue"
            icon="thumbs up outline"
            active={upVoted}
            users={upVotes}
            onClick={!isMine ? onClickUpVote : undefined}
          />
          <Reaction title="いいね" theme="pink" icon="heart" active={liked} users={likes} onClick={onClickLike} />
        </ReactionBlock>
      </Card.Content>
    </Card>
  );
};

export default PraiseCard;

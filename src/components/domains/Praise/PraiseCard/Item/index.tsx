import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { parseMessage, Praise } from '~/domains/praise';
import Avatar from '~/components/ui/Avatar';
import Reaction from '~/components/domains/Praise/Reaction';
import PraiseEditor from '../../PraiseEditor';
import DeletePraise from '../../DeletePraise';

interface PraiseCard extends Omit<Praise, 'createdAt' | 'updatedAt'> {
  upVoted: boolean;
  liked: boolean;
  isMine: boolean;
  isEdit: boolean;
  isSend: boolean;
  isReceived: boolean;
  createdAt: string;
  updatedAt: string;
  onClickUpVote?: () => void;
  onClickLike: () => void;
  onUpdate: (praise: Praise) => void;
  onDelete: () => void;
}

interface PraiseCardProps {
  praise: PraiseCard;
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

const FloatButtonContainer = styled.div`
  position: absolute;
  top: 7px;
  right: 5px;

  > * {
    margin-left: 5px !important;
    cursor: pointer;
  }
`;

const PraiseCard: FC<PraiseCardProps> = ({ praise }) => {
  const parsedMessage = parseMessage(praise.message).parsed;

  return (
    <Card fluid={true}>
      {praise.isSend && (
        <FloatButtonContainer>
          <PraiseEditor praise={praise}>
            <Icon name="pencil" />
          </PraiseEditor>
          <DeletePraise praiseId={praise.id} onDelete={praise.onDelete}>
            <Icon name="trash alternate outline" />
          </DeletePraise>
        </FloatButtonContainer>
      )}
      <Card.Content>
        <CardHeader>
          <TagBlock>
            <Avatar src={praise.from.icon} size="mini" />
            <NameLabel>{praise.from.name}</NameLabel>
          </TagBlock>
          <TagBlock>
            <ArrowLabel> → </ArrowLabel>
          </TagBlock>
          <TagBlock>
            <Avatar src={praise.to.icon} size="mini" />
            <NameLabel>{praise.to.name}</NameLabel>
          </TagBlock>
        </CardHeader>
        <Card.Meta>{`${praise.createdAt}${praise.isEdit ? '（編集済み）' : ''}`}</Card.Meta>
        <Card.Description>
          {parsedMessage.map((word, index) =>
            word.type === 'tag' ? <a key={index}>{` ${word.text}`}</a> : ` ${word.text}`,
          )}
        </Card.Description>
      </Card.Content>
      <Card.Content extra={true}>
        <ReactionBlock>
          <Reaction
            title="賛同"
            theme="blue"
            icon="thumbs up outline"
            active={praise.upVoted}
            users={praise.upVotes}
            onClick={!praise.isMine ? praise.onClickUpVote : undefined}
          />
          <Reaction
            title="いいね"
            theme="pink"
            icon="heart"
            active={praise.liked}
            users={praise.likes}
            onClick={praise.onClickLike}
          />
        </ReactionBlock>
      </Card.Content>
    </Card>
  );
};

export default PraiseCard;

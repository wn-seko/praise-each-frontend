import styled from '@emotion/styled';
import { Emoji } from 'emoji-mart';
import React, { FC } from 'react';
import { FaHeart, FaRegHeart, FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { Tooltip } from '@chakra-ui/react';

type Theme = 'blue' | 'pink' | 'green';

interface ContainerProps
  extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  theme: Theme;
}

const getColor = (theme: Theme) => {
  switch (theme) {
    case 'blue':
      return '#2185d0';
    case 'pink':
      return '#e03997';
    case 'green':
      return '#21ba45';
  }
};

const Container = styled.a`
  display: flex;
  align-items: center;
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: ${(props: ContainerProps) => getColor(props.theme)} !important;
  }

  &[data-active='active'] {
    color: ${(props: ContainerProps) => getColor(props.theme)} !important;
  }

  > i {
    margin: 0 !important;
  }

  > .count {
    margin-left: 4px;
  }
`;

const EmojiContainer = styled.span`
  > span > span {
    display: block !important;
  }
`;

interface ReactionUser {
  id: string;
  name: string;
}

interface ReactionItemProps {
  count?: number;
  active?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

interface ReactionStampProps extends ReactionItemProps {
  stampId: string;
}

interface ReactionProps {
  title: string;
  users: ReactionUser[];
}

type Reaction = {
  UpVote: typeof UpVote;
  Like: typeof Like;
  Stamp: typeof Stamp;
};

const UpVote = React.forwardRef<HTMLAnchorElement, ReactionItemProps>(function UpVoteInner(
  { active = false, count = 0, onClick, onMouseEnter, onMouseLeave },
  ref,
) {
  return (
    <Container
      theme="blue"
      data-active={active ? 'active' : ''}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
    >
      {active ? <FaThumbsUp size={16} /> : <FaRegThumbsUp size={16} />}
      <span className="count">{count}</span>
    </Container>
  );
});

const Like = React.forwardRef<HTMLAnchorElement, ReactionItemProps>(function UpVoteInner(
  { active = false, count = 0, onClick, onMouseEnter, onMouseLeave },
  ref,
) {
  return (
    <Container
      theme="pink"
      data-active={active ? 'active' : ''}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
    >
      {active ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
      <span className="count">{count}</span>
    </Container>
  );
});

const Stamp = React.forwardRef<HTMLAnchorElement, ReactionStampProps>(function StampInner(
  { stampId, active = false, count = 0, onClick, onMouseEnter, onMouseLeave },
  ref,
) {
  return (
    <Container
      theme="green"
      data-active={active ? 'active' : ''}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
    >
      <EmojiContainer>
        <Emoji size={18} emoji={stampId} />
      </EmojiContainer>
      <span className="count">{count}</span>
    </Container>
  );
});

const Reaction: FC<ReactionProps> & Reaction = ({ title, users, children }) => {
  const Content = () => (
    <div>
      <p>{title}</p>
      {users.map((user, index) => (
        <span key={user.id}>{`${user.name}${index < users.length - 1 ? '、' : ''}`}</span>
      ))}
    </div>
  );

  return <Tooltip label={<Content />}>{children}</Tooltip>;
};

Reaction.UpVote = UpVote;
Reaction.Like = Like;
Reaction.Stamp = Stamp;

export default Reaction;

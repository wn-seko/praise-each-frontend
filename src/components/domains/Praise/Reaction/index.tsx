import styled from '@emotion/styled';
import { Emoji } from 'emoji-mart';
import React, { FC } from 'react';
import { Icon, Popup } from 'semantic-ui-react';

type Theme = 'blue' | 'pink' | 'grey';

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
    case 'grey':
      return '#21ba45';
  }
};

const Container = styled.a`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.4) !important;

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
    margin-left: 5px;
  }
`;

const ResizedIcon = styled(Icon)`
  font-size: 16px !important;
  height: 16px !important;
  width: 16px !important;
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

const UpVote: FC<ReactionItemProps> = ({ active = false, count = 0, onClick, onMouseEnter, onMouseLeave }) => (
  <Container
    theme="blue"
    data-active={active ? 'active' : ''}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <ResizedIcon name="thumbs up outline" />
    <span className="count">{count}</span>
  </Container>
);

const Like: FC<ReactionItemProps> = ({ active = false, count = 0, onClick, onMouseEnter, onMouseLeave }) => (
  <Container
    theme="pink"
    data-active={active ? 'active' : ''}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <ResizedIcon name="heart" />
    <span className="count">{count}</span>
  </Container>
);

const Stamp: FC<ReactionStampProps> = ({ stampId, active = false, count = 0, onClick, onMouseEnter, onMouseLeave }) => (
  <Container
    theme="grey"
    data-active={active ? 'active' : ''}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <EmojiContainer>
      <Emoji size={18} emoji={stampId} />
    </EmojiContainer>
    <span className="count">{count}</span>
  </Container>
);

const Reaction: FC<ReactionProps> & Reaction = ({ title, users, children }) => {
  const onlyChildren = React.Children.only(children);

  if (!React.isValidElement(onlyChildren)) {
    return null;
  }

  const enhancedChildren = React.cloneElement(onlyChildren, { count: users.length });

  return (
    <Popup on="hover" trigger={enhancedChildren} inverted={true}>
      <Popup.Header>{title}</Popup.Header>
      <Popup.Content>
        {users.map((user, index) => (
          <span key={user.id}>{`${user.name}${index < users.length - 1 ? '、' : ''}`}</span>
        ))}
      </Popup.Content>
    </Popup>
  );
};

Reaction.UpVote = UpVote;
Reaction.Like = Like;
Reaction.Stamp = Stamp;

export default Reaction;

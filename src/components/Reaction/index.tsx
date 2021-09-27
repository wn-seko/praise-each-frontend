import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Icon, Popup, SemanticICONS } from 'semantic-ui-react';

type Theme = 'blue' | 'pink';

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
  }
};

const Container = styled.a`
  display: inline-block;
  color: rgba(0, 0, 0, 0.4) !important;

  &:hover {
    color: ${(props: ContainerProps) => getColor(props.theme)} !important;
  }

  &[data-active='active'] {
    color: ${(props: ContainerProps) => getColor(props.theme)} !important;
  }
`;

interface ReactionUser {
  id: string;
  name: string;
}

interface BodyProps {
  theme: Theme;
  icon: SemanticICONS;
  users: ReactionUser[];
  active?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

interface ReactionProps extends BodyProps {
  title: string;
}

const Body: FC<BodyProps> = ({ theme, icon, active = false, users, onClick, onMouseEnter, onMouseLeave }) => (
  <Container
    theme={theme}
    data-active={active ? 'active' : ''}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Icon name={icon} />
    <span>{users.length}</span>
  </Container>
);

const Reaction: FC<ReactionProps> = ({ title, ...rest }) => (
  <Popup on="hover" trigger={<Body {...rest} />} inverted={true}>
    <Popup.Header>{title}</Popup.Header>
    <Popup.Content>
      {rest.users.map((user, index) => (
        <span key={user.id}>{`${user.name}${index < rest.users.length - 1 ? '、' : ''}`}</span>
      ))}
    </Popup.Content>
  </Popup>
);

export default Reaction;

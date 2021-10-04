import React, { FC } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import Avatar from '~/components/ui/Avatar';
import { useHeader } from './hooks';

const Header: FC = () => {
  const { createClickMenuHandler } = useHeader();

  return (
    <Menu borderless={true} fixed="top">
      <Container>
        <Menu.Item as="a" onClick={createClickMenuHandler('top')}>
          タイムライン
        </Menu.Item>
        <Menu.Item as="a" onClick={createClickMenuHandler('statistics')}>
          統計
        </Menu.Item>
        <Menu.Item as="a" position="right">
          <Avatar src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" size="mini" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;

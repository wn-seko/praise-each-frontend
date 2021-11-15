import React, { FC } from 'react';
import { Container, Dropdown, Menu } from 'semantic-ui-react';
import Avatar from '~/components/ui/Avatar';
import { useHeader } from './hooks';

const Header: FC = () => {
  const { user, createClickMenuHandler, logout } = useHeader();

  return (
    <Menu borderless={true} fixed="top">
      <Container>
        <Menu.Item as="a" onClick={createClickMenuHandler('top')}>
          タイムライン
        </Menu.Item>
        <Menu.Item as="a" onClick={createClickMenuHandler('users')}>
          ユーザー
        </Menu.Item>
        <Menu.Item as="a" onClick={createClickMenuHandler('teams')}>
          チーム
        </Menu.Item>
        <Menu.Item as="a" onClick={createClickMenuHandler('tags')}>
          タグ
        </Menu.Item>
        <Menu.Item as="a" onClick={createClickMenuHandler('statistics')}>
          統計
        </Menu.Item>
        <Menu.Item as="a" position="right">
          <Dropdown trigger={<Avatar src={user?.icon} size="medium" />}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={createClickMenuHandler('mypage/settings')}>ユーザー設定</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>ログアウト</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;

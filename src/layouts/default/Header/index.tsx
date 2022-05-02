import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Link as StyledLink,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  StackDivider,
} from '@chakra-ui/react';
import { useHeader } from './hooks';
import { getThemeColor } from '~/layouts/theme';

interface NavLinkProps {
  link: string;
}

const NavLink: FC<NavLinkProps> = ({ link, children }) => (
  <Link to={link}>
    <StyledLink
      as="span"
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: getThemeColor('primaryText'),
      }}
    >
      {children}
    </StyledLink>
  </Link>
);

const Header: FC = () => {
  const { user, colorMode, logout, toggleColorMode } = useHeader();

  return (
    <Box bg={getThemeColor('primary')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontWeight="bold">Praise Each</Box>
        <HStack as="nav" fontWeight="bold" spacing={8} divider={<StackDivider borderColor="gray.200" />}>
          <NavLink link="/top">タイムライン</NavLink>
          <NavLink link="/users">ユーザー</NavLink>
          <NavLink link="/teams">チーム</NavLink>
          <NavLink link="/tags">タグ</NavLink>
          <NavLink link="/statistics">統計</NavLink>
        </HStack>
        <Menu>
          <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
            <Avatar size="md" src={user.icon} />
          </MenuButton>
          <MenuList>
            <Link to="/mypage/settings">
              <MenuItem as="span">ユーザー設定</MenuItem>
            </Link>
            <MenuItem onClick={toggleColorMode}>{colorMode === 'dark' ? 'ライトモード' : 'ダークモード'}</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logout}>ログアウト</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Header;

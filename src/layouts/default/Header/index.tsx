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
  useColorModeValue,
} from '@chakra-ui/react';
import { useHeader } from './hooks';

interface NavLinkProps {
  link: string;
}

const NavLink: FC<NavLinkProps> = ({ link, children }) => (
  <Link to={link}>
    <StyledLink
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </StyledLink>
  </Link>
);

const Header: FC = () => {
  const { user, logout } = useHeader();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>Praise Each</Box>
        <HStack as="nav" spacing={8} divider={<StackDivider borderColor="gray.200" />}>
          <NavLink link="top">タイムライン</NavLink>
          <NavLink link="users">ユーザー</NavLink>
          <NavLink link="teams">チーム</NavLink>
          <NavLink link="tags">タグ</NavLink>
          <NavLink link="statistics">統計</NavLink>
        </HStack>
        <Menu>
          <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
            <Avatar size="md" src={user.icon} />
          </MenuButton>
          <MenuList>
            <Link to="mypage/settings">
              <MenuItem as="a">ユーザー設定</MenuItem>
            </Link>
            <MenuDivider />
            <MenuItem onClick={logout}>ログアウト</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Header;

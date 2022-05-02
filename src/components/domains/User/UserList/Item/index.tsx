import React, { FC } from 'react';
import { Avatar, Flex, GridItem, Link as LinkStyle } from '@chakra-ui/react';
import { ColoredLabel } from '~/components/ui/ColoredLabel';
import { User } from '~/domains/user';
import { getThemeColor } from '~/layouts/theme';

interface UserItemProps {
  user: User;
}

const UserItem: FC<UserItemProps> = ({ user }) => (
  <GridItem pb={2} borderBottom="1px solid" borderBottomColor={getThemeColor('border')}>
    <Flex gap={4}>
      <Flex alignItems="center" gap={2}>
        <Avatar size="sm" src={user.icon} />
        <LinkStyle fontSize="1.2rem">{user.name}</LinkStyle>
      </Flex>
      <Flex alignItems="center" gap={2}>
        {user.teams.map((team) => (
          <ColoredLabel key={team.id} color={team.color}>
            {team.name}
          </ColoredLabel>
        ))}
      </Flex>
    </Flex>
  </GridItem>
);

export default UserItem;

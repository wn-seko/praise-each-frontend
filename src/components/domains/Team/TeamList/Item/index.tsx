import React, { FC } from 'react';
import { Avatar, Flex, GridItem, Link as LinkStyle } from '@chakra-ui/react';
import { Team } from '~/domains/team';
import BoxIcon from '~/components/ui/Box';
import { Link } from 'react-router-dom';

interface TeamItemProps {
  team: Team;
  href: string;
}

const TeamItem: FC<TeamItemProps> = ({ team, href }) => {
  return (
    <GridItem pb={2} borderBottom="1px solid" borderBottomColor="gray.300">
      <Flex alignItems="center" gap={4}>
        <Flex alignItems="center" gap={2}>
          <BoxIcon size={15} color={team.color} />
          <Link to={href}>
            <LinkStyle fontSize="1.2rem">{team.name}</LinkStyle>
          </Link>
        </Flex>
        <Flex alignItems="center" gap={2}>
          {team.users.map((user) => (
            <Avatar key={user.id} size="xs" src={user.icon} />
          ))}
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default TeamItem;

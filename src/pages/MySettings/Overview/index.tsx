import React, { FC } from 'react';
import { Avatar, Center, Flex, Heading } from '@chakra-ui/react';
import AccountSettings from '../AccountSettings';
import GeneralSettings from '../GeneralSettings';
import TeamPinSettings from '../TeamPinSettings';
import { useUser } from './hooks';

const Overview: FC = () => {
  const { user } = useUser();

  return (
    user && (
      <Center>
        <Flex width="80%" direction="column" gap={8}>
          <Flex gap={4}>
            <Avatar src={user?.icon} size="md" />
            <Heading as="h2">{user.name}</Heading>
          </Flex>
          <GeneralSettings user={user} />
          <TeamPinSettings />
          <AccountSettings />
        </Flex>
      </Center>
    )
  );
};

export default Overview;

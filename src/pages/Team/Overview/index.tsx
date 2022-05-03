import { Center, Flex, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';

import UiBox from '~/components/ui/Box';

import DeleteTeam from '../DeleteTeam';
import GeneralSettings from '../GeneralSettings';
import SlackWebhookSettings from '../SlackWebhookSettings';
import { useTeam } from './hooks';

interface OverviewProps {
  teamId: string;
}

const Overview: FC<OverviewProps> = ({ teamId }) => {
  const { team } = useTeam(teamId);

  return (
    team && (
      <Center>
        <Flex width="80%" direction="column" gap={8}>
          <Flex alignItems="center" gap={4}>
            <UiBox size={20} color={team.color} />
            <Heading as="h2">{team.name}</Heading>
          </Flex>
          <GeneralSettings team={team} />
          <SlackWebhookSettings teamId={team.id} />
          <DeleteTeam teamId={team.id} />
        </Flex>
      </Center>
    )
  );
};

export default Overview;

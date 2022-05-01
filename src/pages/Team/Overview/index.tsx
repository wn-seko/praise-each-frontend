import React, { FC } from 'react';
import { Center, Flex, Heading } from '@chakra-ui/react';
import UiBox from '~/components/ui/Box';
import { useTeam } from './hooks';
import DeleteTeam from '../DeleteTeam';
import SlackWebhookSettings from '../SlackWebhookSettings';
import GeneralSettings from '../GeneralSettings';

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

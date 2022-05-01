import React, { FC } from 'react';
import { Alert, Flex } from '@chakra-ui/react';
import { BsPinFill, BsPin } from 'react-icons/bs';
import Box from '~/components/ui/Box';
import Segment from '~/components/ui/Segment';
import { useMyTeams } from './hooks';

const TeamPinSettings: FC = () => {
  const { teams } = useMyTeams();

  return (
    <Segment title="タイムライン">
      <Segment.Item title="チームタイムライン">
        {teams.length > 0 ? (
          <Flex direction="column" gap={2}>
            {teams.map((team) => (
              <div key={team.id}>
                <Flex gap={2} cursor="pointer" alignItems="center" onClick={team.onClick}>
                  {team.pined ? <BsPinFill size={16} color="red" /> : <BsPin size={16} color="grey" />}
                  <Box size={15} color={team.color} />
                  {team.name}
                </Flex>
              </div>
            ))}
          </Flex>
        ) : (
          <Alert>チームに所属していません</Alert>
        )}
      </Segment.Item>
    </Segment>
  );
};

export default TeamPinSettings;

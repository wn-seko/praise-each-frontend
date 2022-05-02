import React, { FC, Suspense } from 'react';
import { Center, Flex, Spinner } from '@chakra-ui/react';
import DefaultLayout from '~/layouts/default';
import TeamList from './TeamList';
import CreateTeam from './CreateTeam';

const TeamsPage: FC = () => (
  <DefaultLayout>
    <Center>
      <Flex direction="column" width="80%" gap={8}>
        <Flex justifyContent="end">
          <CreateTeam />
        </Flex>
        <Suspense fallback={<Spinner />}>
          <TeamList />
        </Suspense>
      </Flex>
    </Center>
  </DefaultLayout>
);

export default TeamsPage;

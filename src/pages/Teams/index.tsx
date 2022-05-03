import { Center, Flex } from '@chakra-ui/react';
import React, { FC, Suspense } from 'react';

import Loader from '~/components/ui/Loader';
import DefaultLayout from '~/layouts/default';

import CreateTeam from './CreateTeam';
import TeamList from './TeamList';

const TeamsPage: FC = () => (
  <DefaultLayout>
    <Center>
      <Flex direction="column" width="80%" gap={8}>
        <Flex justifyContent="flex-end">
          <CreateTeam />
        </Flex>
        <Suspense fallback={<Loader page={true}>Loading...</Loader>}>
          <TeamList />
        </Suspense>
      </Flex>
    </Center>
  </DefaultLayout>
);

export default TeamsPage;

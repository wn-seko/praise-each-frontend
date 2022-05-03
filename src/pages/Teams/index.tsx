import React, { FC, Suspense } from 'react';
import { Center, Flex } from '@chakra-ui/react';
import DefaultLayout from '~/layouts/default';
import TeamList from './TeamList';
import CreateTeam from './CreateTeam';
import Loader from '~/components/ui/Loader';

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

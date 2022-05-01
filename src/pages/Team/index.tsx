import React, { FC, Suspense } from 'react';
import { RouteComponentProps } from 'react-router';
import { Spinner } from '@chakra-ui/react';
import DefaultLayout from '~/layouts/default';
import Overview from './Overview';

interface Params {
  teamId: string;
}

const TeamPage: FC<RouteComponentProps<Params>> = ({ match }) => {
  return (
    <DefaultLayout>
      <Suspense fallback={<Spinner />}>
        <Overview teamId={match.params.teamId} />
      </Suspense>
    </DefaultLayout>
  );
};

export default TeamPage;

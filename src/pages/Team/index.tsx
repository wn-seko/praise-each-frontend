import React, { FC, Suspense } from 'react';
import { RouteComponentProps } from 'react-router';
import DefaultLayout from '~/layouts/default';
import Overview from './Overview';
import Loader from '~/components/ui/Loader';

interface Params {
  teamId: string;
}

const TeamPage: FC<RouteComponentProps<Params>> = ({ match }) => {
  return (
    <DefaultLayout>
      <Suspense fallback={<Loader page={true}>Loading...</Loader>}>
        <Overview teamId={match.params.teamId} />
      </Suspense>
    </DefaultLayout>
  );
};

export default TeamPage;

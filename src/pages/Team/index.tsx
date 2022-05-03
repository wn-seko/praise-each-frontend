import React, { FC, Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Loader from '~/components/ui/Loader';
import DefaultLayout from '~/layouts/default';

import Overview from './Overview';

const TeamPage: FC = () => {
  const { teamId } = useParams();

  if (!teamId) {
    return <Navigate to="/notfound" />;
  }

  return (
    <DefaultLayout>
      <Suspense fallback={<Loader page={true}>Loading...</Loader>}>
        <Overview teamId={teamId} />
      </Suspense>
    </DefaultLayout>
  );
};

export default TeamPage;

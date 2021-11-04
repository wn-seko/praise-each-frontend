import React, { FC, Suspense } from 'react';
import { Loader } from 'semantic-ui-react';
import DefaultLayout from '~/layouts/default';
import Overview from './Overview';

const MySettings: FC = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<Loader active={true}>Loading...</Loader>}>
        <Overview />
      </Suspense>
    </DefaultLayout>
  );
};

export default MySettings;

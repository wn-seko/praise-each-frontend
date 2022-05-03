import React, { FC, Suspense } from 'react';

import Loader from '~/components/ui/Loader';
import DefaultLayout from '~/layouts/default';

import Overview from './Overview';

const MySettings: FC = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<Loader page={true}>Loading...</Loader>}>
        <Overview />
      </Suspense>
    </DefaultLayout>
  );
};

export default MySettings;

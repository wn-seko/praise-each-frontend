import React, { FC, Suspense } from 'react';
import DefaultLayout from '~/layouts/default';
import Overview from './Overview';
import Loader from '~/components/ui/Loader';

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

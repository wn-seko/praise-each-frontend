import React, { FC, Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';
import DefaultLayout from '~/layouts/default';
import Overview from './Overview';

const MySettings: FC = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<Spinner />}>
        <Overview />
      </Suspense>
    </DefaultLayout>
  );
};

export default MySettings;

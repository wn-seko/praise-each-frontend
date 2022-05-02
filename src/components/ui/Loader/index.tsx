import React, { FC } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

interface LoaderProps {
  page?: boolean;
  noHeader?: boolean;
}

const Loader: FC<LoaderProps> = ({ page = false, noHeader = false, children }) => (
  <Flex h={page ? (noHeader ? '100vh' : '80vh') : undefined} justifyContent="center" alignItems="center">
    <Flex alignItems="center" gap={4}>
      <Spinner size="xl" />
      {children}
    </Flex>
  </Flex>
);

export default Loader;

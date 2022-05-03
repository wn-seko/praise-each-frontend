import { Alert, AlertIcon, Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

const NotFoundPage: FC = () => (
  <Flex justifyContent="center">
    <Alert status="error" justifyContent="center">
      <AlertIcon />
      お探しのページは見つかりませんでした。
    </Alert>
  </Flex>
);

export default NotFoundPage;

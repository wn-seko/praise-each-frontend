import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { FC } from 'react';

import Notification from '~/components/domains/Notification';

import { getThemeColor } from '../theme';
import Header from './Header';

const PageContainer = styled.div`
  margin-top: 30px;
  padding-bottom: 50px;
`;

const DefaultLayout: FC = ({ children }) => {
  return (
    <Box className="layout default" backgroundColor={getThemeColor('globalBackground')}>
      <Header />
      <PageContainer className="page">{children}</PageContainer>
      <Notification />
    </Box>
  );
};

export default DefaultLayout;

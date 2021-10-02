import styled from '@emotion/styled';
import React, { FC } from 'react';
import Notification from '~/components/domains/Notification';
import Header from './Header';

const PageContainer = styled.div`
  margin-top: 80px;
`;

const DefaultLayout: FC = ({ children }) => (
  <div className="layout default">
    <Header />
    <PageContainer className="page">{children}</PageContainer>
    <Notification />
  </div>
);

export default DefaultLayout;

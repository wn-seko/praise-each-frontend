import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Loader } from 'semantic-ui-react';
import Notification from '~/components/domains/Notification';
import Header from './Header';

const PageContainer = styled.div`
  margin-top: 80px;
`;

interface DefaultLayoutProps {
  loading?: boolean;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ loading, children }) => {
  return (
    <div className="layout default">
      <Header />
      <PageContainer className="page">{loading ? <Loader active={true}>Loading...</Loader> : children}</PageContainer>
      <Notification />
    </div>
  );
};

export default DefaultLayout;

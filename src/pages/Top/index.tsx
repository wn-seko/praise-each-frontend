/* TODO: delete eslint-disable */
/* eslint-disable react/display-name */

import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Container, Divider, Loader, Message, Tab, TabProps } from 'semantic-ui-react';
import PraiseCard from '~/components/domains/Praise/PraiseCard';
import ScrollLoader from '~/components/functional/ScrollLoader';
import DefaultLayout from '~/layouts/default';
import { EnhancedPraise, usePraisePage, useScroll, useTab } from './hooks/usePraisePage';
import PraiseInput from './PraiseInput';

interface PraisePaneProps {
  loading: boolean;
  praises: EnhancedPraise[];
}

const ScrollLoaderContainer = styled.div`
  margin-top: 20px;
`;

const SearchPane: FC<PraisePaneProps> = () => {
  return <Tab.Pane as="div">Coming soon...</Tab.Pane>;
};

const PraisePane: FC<PraisePaneProps> = ({ loading, praises }) => {
  const { loadOnScroll, onInRange } = useScroll();

  if (loading) {
    return <Loader active={true}>Loading...</Loader>;
  }

  if (praises.length === 0) {
    return <Message info={true}>まだ何も無いようです</Message>;
  }

  return (
    <Tab.Pane as="div">
      <PraiseCard>
        {praises.map((item) => (
          <PraiseCard.Card key={item.id} {...item} />
        ))}
      </PraiseCard>
      <ScrollLoaderContainer>
        <ScrollLoader loading={loadOnScroll} onInRange={onInRange} />
      </ScrollLoaderContainer>
    </Tab.Pane>
  );
};

const TopPage: FC = () => {
  const { currentTab, loading, praises, refetchTimeline } = usePraisePage();
  const { handleChangeTab } = useTab();
  const activeTabIndex = ['timeline', 'received', 'sent', 'search'].findIndex((tab) => tab === currentTab);

  const onTabChange = (_: React.MouseEvent<HTMLDivElement>, data: TabProps) => {
    switch (data.activeIndex || 0) {
      case 0:
        handleChangeTab('timeline');
        break;
      case 1:
        handleChangeTab('received');
        break;
      case 2:
        handleChangeTab('sent');
        break;
      case 3:
        handleChangeTab('search');
        break;
    }
  };

  return (
    <DefaultLayout>
      <Container>
        <PraiseInput refetchTimeline={refetchTimeline} />
        <Divider />
        <Tab
          activeIndex={activeTabIndex}
          onTabChange={onTabChange}
          menu={{ secondary: true, pointing: true }}
          panes={[
            {
              menuItem: 'タイムライン',
              render: () => <PraisePane loading={loading} praises={praises} />,
            },
            {
              menuItem: '受け取った',
              render: () => <PraisePane loading={loading} praises={praises} />,
            },
            {
              menuItem: '送った',
              render: () => <PraisePane loading={loading} praises={praises} />,
            },
            {
              menuItem: '検索',
              render: () => <SearchPane loading={loading} praises={praises} />,
            },
          ]}
        />
      </Container>
    </DefaultLayout>
  );
};

export default TopPage;

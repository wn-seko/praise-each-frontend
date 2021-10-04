/* TODO: delete eslint-disable */
/* eslint-disable react/display-name */

import React, { FC } from 'react';
import { Container, Divider, Loader, Message, Tab, TabProps } from 'semantic-ui-react';
import PraiseCard from '~/components/ui/PraiseCard';
import DefaultLayout from '~/layouts/default';
import { EnhancedPraise, usePraisePage, useTab } from './hooks/usePraisePage';
import PraiseInput from './PraiseInput';

interface PraisePaneProps {
  active: boolean;
  loading: boolean;
  praises: EnhancedPraise[];
}

const PraisePane: FC<PraisePaneProps> = ({ active, loading, praises }) => {
  if (loading) {
    return <Loader active={true}>Loading...</Loader>;
  }

  if (praises.length === 0) {
    return <Message info={true}>まだ何も無いようです</Message>;
  }

  return (
    <Tab.Pane active={active || true} as="div">
      <PraiseCard>
        {praises.map((item) => (
          <PraiseCard.Card key={item.id} {...item} />
        ))}
      </PraiseCard>
    </Tab.Pane>
  );
};

const TopPage: FC = () => {
  const { currentTab, loading, praises, refetchTimeline } = usePraisePage();
  const { handleChangeTab } = useTab();
  const activeTabIndex = ['timeline', 'toMe', 'fromMe'].findIndex((tab) => tab === currentTab);

  const onTabChange = (_: React.MouseEvent<HTMLDivElement>, data: TabProps) => {
    switch (data.activeIndex || 0) {
      case 0:
        handleChangeTab('timeline');
        break;
      case 1:
        handleChangeTab('toMe');
        break;
      case 2:
        handleChangeTab('fromMe');
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
              render: () => <PraisePane active={currentTab === 'timeline'} loading={loading} praises={praises} />,
            },
            {
              menuItem: '受け取った',
              render: () => <PraisePane active={currentTab === 'toMe'} loading={loading} praises={praises} />,
            },
            {
              menuItem: '送った',
              render: () => <PraisePane active={currentTab === 'fromMe'} loading={loading} praises={praises} />,
            },
          ]}
        />
      </Container>
    </DefaultLayout>
  );
};

export default TopPage;

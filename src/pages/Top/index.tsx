/* TODO: delete eslint-disable */
/* eslint-disable react/display-name */

import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Container, Divider, Loader, Message, Tab, TabProps } from 'semantic-ui-react';
import PraiseCard from '~/components/domains/Praise/PraiseCard';
import ScrollLoader from '~/components/functional/ScrollLoader';
import { Team } from '~/domains/team';
import DefaultLayout from '~/layouts/default';
import { EnhancedPraise, TabState, usePraisePage, useScroll, useTab } from './hooks/usePraisePage';
import { usePinedTeams } from './hooks/useTeamPin';
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

const getTabIndex = (tab: TabState, pinedTeams: Team[]) => {
  switch (tab.type) {
    case 'timeline':
      return 0;
    case 'received':
      return 1 + pinedTeams.length;
    case 'sent':
      return 2 + pinedTeams.length;
    case 'search':
      return 3 + pinedTeams.length;
    case 'team':
      return pinedTeams.findIndex((pinedTeam) => pinedTeam.id === tab.id) + 1;
  }
};

const TopPage: FC = () => {
  const { currentTab, loading, praises, refetchTimeline } = usePraisePage();
  const { pinedTeams } = usePinedTeams();
  const { handleChangeTab } = useTab();
  const activeTabIndex = getTabIndex(currentTab, pinedTeams);

  const onTabChange = (_: React.MouseEvent<HTMLDivElement>, data: TabProps) => {
    const activeIndex = Number(data.activeIndex) || 0;

    switch (activeIndex) {
      case 0:
        handleChangeTab('timeline');
        break;
      case 1 + pinedTeams.length:
        handleChangeTab('received');
        break;
      case 2 + pinedTeams.length:
        handleChangeTab('sent');
        break;
      case 3 + pinedTeams.length:
        handleChangeTab('search');
        break;
      default:
        handleChangeTab('team', pinedTeams[activeIndex - 1]?.id || '');
        break;
    }
  };

  const timelinePanes = [
    {
      menuItem: 'タイムライン',
      render: () => <PraisePane loading={loading} praises={praises} />,
    },
  ].concat(
    pinedTeams.map((pinedTeam) => ({
      menuItem: pinedTeam.name,
      render: () => <PraisePane loading={loading} praises={praises} />,
    })),
  );

  const searchPanes = [
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
  ];

  const panes = timelinePanes.concat(searchPanes);

  return (
    <DefaultLayout>
      <Container>
        <PraiseInput refetchTimeline={refetchTimeline} />
        <Divider />
        <Tab
          activeIndex={activeTabIndex}
          onTabChange={onTabChange}
          menu={{ secondary: true, pointing: true }}
          panes={panes}
        />
      </Container>
    </DefaultLayout>
  );
};

export default () => (
  <React.Suspense fallback={<Loader active={true}>Loading...</Loader>}>
    <TopPage />
  </React.Suspense>
);

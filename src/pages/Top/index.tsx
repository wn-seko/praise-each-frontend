/* TODO: delete eslint-disable */
/* eslint-disable react/display-name */

import styled from '@emotion/styled';
import React, { FC } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Tab,
  Tabs,
  TabPanels,
  TabList,
  TabPanel,
  Center,
} from '@chakra-ui/react';
import PraiseCard from '~/components/domains/Praise/PraiseCard';
import ScrollLoader from '~/components/functional/ScrollLoader';
import PraiseInput from '~/components/domains/Praise/PraiseInput';
import DefaultLayout from '~/layouts/default';
import { EnhancedPraise, usePraisePage, useScroll, useTab } from './hooks/usePraisePage';
import { usePinedTeams } from './hooks/useTeamPin';
import { useMessage } from './hooks/useMessage';

interface PraisePaneProps {
  loading: boolean;
  praises: EnhancedPraise[];
}

const ScrollLoaderContainer = styled.div`
  margin-top: 20px;
`;

const SearchContent: FC<PraisePaneProps> = () => (
  <Alert status="info">
    <AlertIcon />
    Coming soon...
  </Alert>
);

const PraiseContent: FC<PraisePaneProps> = ({ loading, praises }) => {
  const { loadOnScroll, onInRange } = useScroll();

  if (loading) {
    return (
      <Center>
        <Spinner marginRight={4} />
        Loading...
      </Center>
    );
  }

  if (praises.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        まだ何もないようです
      </Alert>
    );
  }

  return (
    <>
      <PraiseCard>
        {praises.map((item) => (
          <PraiseCard.Card key={item.id} praise={item} />
        ))}
      </PraiseCard>
      <ScrollLoaderContainer>
        <ScrollLoader loading={loadOnScroll} onInRange={onInRange} />
      </ScrollLoaderContainer>
    </>
  );
};

const TopPage: FC = () => {
  const { loading, praises, refetchTimeline } = usePraisePage();
  const { ref, sending, handleChangeMessage, handleClickSend } = useMessage(refetchTimeline);
  const { pinedTeams } = usePinedTeams();
  const { handleChangeTab } = useTab();

  const onTabChange = (index: number) => {
    switch (index) {
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
        handleChangeTab('team', pinedTeams[index - 1]?.id || '');
        break;
    }
  };

  return (
    <DefaultLayout>
      <Grid margin="0 auto" placeItems="center" gap={8}>
        <GridItem w="80%">
          <Flex alignItems="center" flexShrink={0} flexWrap="nowrap" w="100%" gap={4}>
            <Box flexGrow={1}>
              <PraiseInput ref={ref} handleChangeMessage={handleChangeMessage} />
            </Box>
            <Button disabled={sending} onClick={handleClickSend}>
              送信
            </Button>
          </Flex>
        </GridItem>
        <GridItem w="80%">
          <Tabs isLazy={true} onChange={onTabChange}>
            <TabList>
              <Tab>タイムライン</Tab>
              {pinedTeams.map((pinedTeam) => (
                <Tab key={pinedTeam.id}>{pinedTeam.name}</Tab>
              ))}
              <Tab>受け取った</Tab>
              <Tab>送った</Tab>
              <Tab>検索</Tab>
            </TabList>
            <TabPanels>
              {[...Array(pinedTeams.length + 3)].map((_, index) => (
                <TabPanel key={index}>
                  <PraiseContent loading={loading} praises={praises} />
                </TabPanel>
              ))}
              <TabPanel>
                <SearchContent loading={loading} praises={praises} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </DefaultLayout>
  );
};

export default () => (
  <React.Suspense fallback={<Spinner>Loading...</Spinner>}>
    <TopPage />
  </React.Suspense>
);

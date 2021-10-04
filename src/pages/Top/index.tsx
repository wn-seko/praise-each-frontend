/* TODO: delete eslint-disable */
/* eslint-disable react/display-name */

import React, { FC } from 'react';
import { Container, Divider, Loader, Tab, TabProps } from 'semantic-ui-react';
import PraiseCard from '~/components/ui/PraiseCard';
import DefaultLayout from '~/layouts/default';
import { EnhancedPraise, usePraisePage, useTab } from './hooks/usePraisePage';
import PraiseInput from './PraiseInput';

interface PraisePaneProps {
  loading: boolean;
  praises: EnhancedPraise[];
}

const PraisePane: FC<PraisePaneProps> = ({ loading, praises }) => {
  if (loading) {
    return <Loader active={true}>Loading...</Loader>;
  }

  return (
    <PraiseCard>
      {praises.map((item) => (
        <PraiseCard.Card key={item.id} {...item} />
      ))}
    </PraiseCard>
  );
};

const TopPage: FC = () => {
  const { loading, praises } = usePraisePage();
  const { handleChangeTab } = useTab();

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
        <PraiseInput />
        <Divider />
        <Tab
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
          ]}
        />
      </Container>
    </DefaultLayout>
  );
};

export default TopPage;

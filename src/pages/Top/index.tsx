/* TODO: delete eslint-disable */
/* eslint-disable react/display-name */

import React, { FC } from 'react';
import { Container, Divider, Loader, Tab } from 'semantic-ui-react';
import PraiseCard from '~/components/ui/PraiseCard';
import DefaultLayout from '~/layouts/default';
import { usePraise } from './hooks';
import PraiseInput from './PraiseInput';

const Pane: FC = () => {
  const { loading, priases } = usePraise();

  if (loading) {
    return (
      <Loader active={true} loading={true}>
        Loading...
      </Loader>
    );
  }

  return (
    <PraiseCard>
      {priases.map((item, index) => (
        <PraiseCard.Card key={index} {...item} />
      ))}
    </PraiseCard>
  );
};

const TopPage: FC = () => {
  return (
    <DefaultLayout>
      <Container>
        <PraiseInput />
        <Divider />
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={[
            {
              menuItem: 'タイムライン',
              render: () => <Pane />,
            },
            {
              menuItem: '受け取った',
              render: () => <Pane />,
            },
            {
              menuItem: '送った',
              render: () => <Pane />,
            },
          ]}
        />
      </Container>
    </DefaultLayout>
  );
};

export default TopPage;

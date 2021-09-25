/* TODO: delete eslint-disable */
/* eslint-disable react/display-name */

import React, { FC } from 'react';
import { Container, Divider, Loader, Segment, Tab } from 'semantic-ui-react';
import PraiseCard from '~/components/PraiseCard';
import { usePraise } from './hooks';
import PraiseInput from './PraiseInput';

const Pane: FC = () => {
  const { loading, priases } = usePraise();

  if (loading) {
    return (
      <Segment height={500}>
        <Loader>Loading...</Loader>
      </Segment>
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
  );
};

export default TopPage;

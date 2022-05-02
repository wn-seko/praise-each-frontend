import React, { FC } from 'react';
import Item from './Item';
import { Grid } from '@chakra-ui/react';

type TeamList = {
  Item: typeof Item;
};

const TeamList: FC & TeamList = (props) => <Grid templateColumns="repeat(2, 1fr)" gap={4} {...props} />;

TeamList.Item = Item;

export default TeamList;

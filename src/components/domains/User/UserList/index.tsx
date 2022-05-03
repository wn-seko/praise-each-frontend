import { Grid } from '@chakra-ui/react';
import React, { FC } from 'react';

import Item from './Item';

type UserList = {
  Item: typeof Item;
};

const UserList: FC & UserList = (props) => <Grid templateColumns="repeat(2, 1fr)" gap={4} {...props} />;

UserList.Item = Item;

export default UserList;

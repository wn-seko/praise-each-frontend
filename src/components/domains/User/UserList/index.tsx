import React, { FC } from 'react';
import Item from './Item';
import { List } from 'semantic-ui-react';

type UserList = {
  Item: typeof Item;
};

const UserList: FC & UserList = (props) => <List divided={true} relaxed={true} size="huge" {...props} />;

UserList.Item = Item;

export default UserList;

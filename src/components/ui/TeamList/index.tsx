import React, { FC } from 'react';
import Item from './Item';
import { List } from 'semantic-ui-react';

type TeamList = {
  Item: typeof Item;
};

const TeamList: FC & TeamList = (props) => <List divided={true} relaxed={true} size="huge" {...props} />;

TeamList.Item = Item;

export default TeamList;

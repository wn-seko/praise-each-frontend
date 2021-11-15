import React, { FC } from 'react';
import Item from './Item';
import { List } from 'semantic-ui-react';

type TagList = {
  Item: typeof Item;
};

const TagList: FC & TagList = (props) => <List divided={true} size="small" {...props} />;

TagList.Item = Item;

export default TagList;

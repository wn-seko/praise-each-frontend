import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

import Card from './Item';

type PraiseCard = {
  Card: typeof Card;
};

const PraiseCard: FC & PraiseCard = (props) => <Flex direction="column" gap={8} {...props} />;

PraiseCard.Card = Card;

export default PraiseCard;

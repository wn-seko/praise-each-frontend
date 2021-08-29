import React, { FC } from 'react'
import Card from './Item'
import { Card as SemanticCard, CardGroupProps } from 'semantic-ui-react'

type PraiseCard = {
  Card: typeof Card
}

const PraiseCard: FC<CardGroupProps> & PraiseCard = (props) => <SemanticCard.Group {...props} />

PraiseCard.Card = Card

export default PraiseCard

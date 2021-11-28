import React from 'react';
import { Bottle, Entry } from '../razzleTypes';
import BottleElement from './BottleElement';
import ClaimedBottleElement from './ClaimedBottleElement';

interface IBottleListElementProps {
  entries: Entry[];
  bottles: Bottle[];
}

export default function BottleList(
  props: IBottleListElementProps
): JSX.Element {
  const { bottles, entries } = props;
  const winners = entries.filter((entry) => entry.hasWon);
  const claimedBottleElements = winners.map((item) => (
    <ClaimedBottleElement winner={item} key={item.name + item.number} />
  ));
  const remainingBottles = bottles.filter((bottle) =>
    bottle.qtyClaimed ? bottle.qty > bottle.qtyClaimed : true
  );
  const bottleElements = remainingBottles.map((item) => (
    <BottleElement bottle={item} key={item.index} />
  ));
  return (
    <div>
      {bottleElements}
      <div style={{ margin: '10px' }}>
        {winners.length === 0 ? null : 'Winners'}
      </div>
      {claimedBottleElements}
    </div>
  );
}

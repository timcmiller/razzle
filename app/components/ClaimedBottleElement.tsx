import React from 'react';
import { Entry } from '../razzleTypes';

interface IClaimedBottleElementProps {
  winner: Entry;
}

export default function ClaimedBottleElement(
  props: IClaimedBottleElementProps
): JSX.Element {
  const { winner } = props;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px',
      }}
    >
      <span>{winner.winningBottle}</span>
      <span>{winner.name}</span>
    </div>
  );
}

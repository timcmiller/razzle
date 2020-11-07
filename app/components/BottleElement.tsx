import React from 'react';
import { Bottle } from '../razzleTypes';

interface IBottleElementProps {
  bottle: Bottle;
}

export default function BottleElement(props: IBottleElementProps): JSX.Element {
  const { bottle } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{bottle.name}</span>
      <span>
        {bottle.qtyClaimed ? bottle.qty - bottle.qtyClaimed : bottle.qty}
      </span>
    </div>
  );
}

import React from 'react';
import { Entry } from '../razzleTypes';

interface IEntryWinnerElementProps {
  entry: Entry;
}

export default function EntryWinnerElement(
  props: IEntryWinnerElementProps
): JSX.Element {
  const { entry } = props;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px',
      }}
    >
      <span>{entry.name}</span>
      <span>{entry.winningBottle}</span>
    </div>
  );
}

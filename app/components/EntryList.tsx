import React from 'react';
import EntryWinnerElement from './EntryWinnerElement';
import EntryElement from './EntryElement';
import { Entry, Bottle } from '../razzleTypes';

interface IEntryListElementProps {
  entries: Entry[];
  bottles: Bottle[];
}

export default function EntryList(props: IEntryListElementProps): JSX.Element {
  const { entries, bottles } = props;
  const winners = entries.filter((entry) => entry.hasWon);
  const nonWinners = entries.filter((entry) => !entry.hasWon);
  const entryWinnerElements = winners.map((item) => (
    <EntryWinnerElement entry={item} key={item.number} />
  ));
  const entryElements = nonWinners.map((item) => (
    <EntryElement entry={item} bottles={bottles} key={item.number} />
  ));
  return (
    <div>
      <div style={{ margin: '10px' }}>
        {entryWinnerElements.length === 0 ? null : 'Winners'}
      </div>
      {entryWinnerElements}
      <div style={{ margin: '10px' }}>
        {entryElements.length === 0 ? null : 'Entries'}
      </div>
      {entryElements}
    </div>
  );
}

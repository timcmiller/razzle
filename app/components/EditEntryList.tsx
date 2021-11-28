import React from 'react';
import EntryWinnerElement from './EntryWinnerElement';
import EditEntryElement from './EditEntryElement';
import { Entry } from '../razzleTypes';

interface IEditEntryListElementProps {
  entries: Entry[];
  onEntriesChanged: (entries: Entry[]) => void;
}

interface IEditEntryListElementState {
  pendingEntries: Entry[];
}

class EditEntryList extends React.Component<
  IEditEntryListElementProps,
  IEditEntryListElementState
> {
  constructor(props: IEditEntryListElementProps) {
    super(props);
    const { entries } = props;
    this.state = {
      pendingEntries: [...entries],
    };

    this.onEntryChanged = this.onEntryChanged.bind(this);
  }

  onEntryChanged(newEntry: Entry) {
    const { onEntriesChanged } = this.props;
    const { pendingEntries } = this.state;
    const newPendingEntries = pendingEntries.map((entry) => {
      if (newEntry.number === entry.number && newEntry.name === entry.name) {
        return newEntry;
      }
      return entry;
    });
    this.setState(
      () => {
        return {
          pendingEntries: newPendingEntries,
        };
      },
      () => {
        onEntriesChanged(newPendingEntries);
      }
    );
  }

  render() {
    const { entries } = this.props;
    const winners = entries.filter((entry) => entry.hasWon);
    const nonWinners = entries.filter((entry) => !entry.hasWon);
    const entryWinnerElements = winners.map((item) => (
      <EntryWinnerElement entry={item} key={item.number + item.name} />
    ));
    const entryElements = nonWinners.map((item) => (
      <EditEntryElement
        entry={item}
        onEntryChanged={this.onEntryChanged}
        key={item.number + item.name}
      />
    ));
    return (
      <div>
        <div>{entryWinnerElements.length === 0 ? null : 'Winners'}</div>
        {entryWinnerElements}
        <div>{entryElements.length === 0 ? null : 'Entries'}</div>
        {entryElements}
      </div>
    );
  }
}

export default EditEntryList;

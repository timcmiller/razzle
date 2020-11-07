import React from 'react';
import EditEntryList from './EditEntryList';
import EntryList from './EntryList';
import { Entry, Bottle } from '../razzleTypes';

interface IEntryTabProps {
  isEdit: boolean;
  entries: Entry[];
  bottles: Bottle[];
  onEntriesChanged: (entries: Entry[]) => void;
}

export default function EntryTab(props: IEntryTabProps): JSX.Element {
  const { isEdit, entries, bottles, onEntriesChanged } = props;
  return (
    <div>
      {isEdit ? (
        <EditEntryList entries={entries} onEntriesChanged={onEntriesChanged} />
      ) : (
        <EntryList entries={entries} bottles={bottles} />
      )}
      {entries.length === 0 ? (
        <div>
          <h3>No Entries</h3>
          <div>To add entries select Edit and the Import Entries</div>
        </div>
      ) : null}
    </div>
  );
}

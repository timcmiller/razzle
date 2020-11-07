import React from 'react';
import BottleList from './BottleList';
import EditBottleList from './EditBottleList';
import { Bottle, Entry } from '../razzleTypes';

interface IBottleTabProps {
  isEdit: boolean;
  bottles: Bottle[];
  entries: Entry[];
  onBottlesChanged: (bottles: Bottle[]) => void;
}

export default function BottleTab(props: IBottleTabProps): JSX.Element {
  const { isEdit, bottles, entries, onBottlesChanged } = props;
  return (
    <div>
      {isEdit ? (
        <EditBottleList bottles={bottles} onBottlesChanged={onBottlesChanged} />
      ) : (
        <BottleList entries={entries} bottles={bottles} />
      )}
      {bottles.length === 0 && !isEdit ? (
        <div>
          <h3>No Bottles</h3>
          <div>To add bottles select Edit and add bottles then Save</div>
        </div>
      ) : null}
    </div>
  );
}

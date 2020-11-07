import React from 'react';
import { Button, Popover } from '@material-ui/core';
import { Entry, Bottle } from '../razzleTypes';
import RankingList from './RankingList';

interface IEntryElementProps {
  entry: Entry;
  bottles: Bottle[];
}

export default function EntryElement(props: IEntryElementProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { entry, bottles } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ margin: 'auto auto auto 0px' }}>{entry.name}</span>
      <span style={{ margin: 'auto' }}>{entry.entries}</span>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Rankings
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <RankingList rankings={entry.rankings} bottles={bottles} />
      </Popover>
    </div>
  );
}

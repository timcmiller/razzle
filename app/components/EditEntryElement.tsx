import React from 'react';
import { TextField } from '@material-ui/core';
import { Entry } from '../razzleTypes';

interface IEditEntryElementProps {
  entry: Entry;
  onEntryChanged: (entry: Entry) => void;
}

class EditEntryElement extends React.Component<IEditEntryElementProps> {
  constructor(props: IEditEntryElementProps) {
    super(props);

    this.handleEntryChange = this.handleEntryChange.bind(this);
  }

  handleEntryChange(event: { target: { value: string } }) {
    const { onEntryChanged, entry } = this.props;
    // eslint-disable-next-line no-restricted-globals
    const newEntries = isNaN(parseInt(event.target.value, 10))
      ? 0
      : parseInt(event.target.value, 10);
    onEntryChanged({
      ...entry,
      entries: newEntries,
    });
  }

  render() {
    const { entry } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <span style={{ margin: 'auto' }}>{entry.name}</span>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-number"
            label="Number"
            color="primary"
            type="number"
            variant="outlined"
            defaultValue={entry.entries}
            onChange={this.handleEntryChange}
            style={{ width: '150px' }}
          />
        </form>
      </div>
    );
  }
}

export default EditEntryElement;

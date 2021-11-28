import React from 'react';
import { TextField } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import { Bottle } from '../razzleTypes';

interface IEditBottleElementProps {
  bottle: Bottle;
  setPendingBottle: (name: string, qty: number, index: number) => void;
  removeBottle: (index: number) => void;
}

class EditBottleElement extends React.Component<IEditBottleElementProps> {
  constructor(props: IEditBottleElementProps) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleNameChange(event: { target: { value: string } }) {
    const { setPendingBottle, bottle } = this.props;
    const { qty, index } = bottle;
    setPendingBottle(event.target.value, qty, index);
  }

  handleQtyChange(event: { target: { value: string } }) {
    const { setPendingBottle, bottle } = this.props;
    const { name, index } = bottle;
    // eslint-disable-next-line no-restricted-globals
    const value = isNaN(parseInt(event.target.value, 10))
      ? 0
      : parseInt(event.target.value, 10);
    setPendingBottle(name, value, index);
  }

  handleRemoveClick() {
    const { bottle, removeBottle } = this.props;
    const { index } = bottle;
    removeBottle(index);
  }

  render() {
    const { bottle } = this.props;
    const { name, qty } = bottle;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <form noValidate autoComplete="off">
          <TextField
            id="standard-required"
            label="Standard"
            color="primary"
            defaultValue={name}
            onChange={this.handleNameChange}
            style={{ margin: '20px 0px 20px 0px' }}
          />
          <TextField
            id="outlined-number"
            label="Number"
            color="primary"
            type="number"
            variant="outlined"
            defaultValue={qty}
            onChange={this.handleQtyChange}
            style={{ width: '75px' }}
          />
          <IconButton onClick={this.handleRemoveClick}>
            <RemoveIcon />
          </IconButton>
        </form>
      </div>
    );
  }
}

export default EditBottleElement;
